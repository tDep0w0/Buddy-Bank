from app.schemas.expense import (
    ExpenseCreate,
    ExpenseRead,
    ExpenseSplitRead,
    ReceiptItemRead,
)
from app.db.models import (
    Expense as DBExpense,
    ExpenseSplit as DBExpenseSplit,
    ReceiptItem as DBReceiptItem,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload
from app.services.balance import apply_expense
from app.schemas.balance import MemberExpense
from app.services.debt import refresh_debt
import uuid


async def add_expense(expense_data: ExpenseCreate, db: AsyncSession) -> ExpenseRead:
    db_expense = DBExpense(
        payer_id=expense_data.payer_id,
        group_id=expense_data.group_id,
        receipt_image_url=expense_data.receipt_image_url,
        amount=expense_data.amount,
        description=expense_data.description,
        category=expense_data.category,
    )

    db.add(db_expense)
    await db.flush()

    db_items = []
    if expense_data.items:
        db_items = [
            DBReceiptItem(expense_id=db_expense.id, name=item.name, price=item.price)
            for item in expense_data.items
        ]
        db.add_all(db_items)
        await db.flush()

    splits = [
        DBExpenseSplit(
            expense_id=db_expense.id, user_id=split.user_id, amount=split.amount
        )
        for split in expense_data.splits
    ]

    if expense_data.items:
        item_ids = [item.id for item in db_items]
        for item, item_id in zip(expense_data.items or [], item_ids):
            splits.extend(
                [
                    DBExpenseSplit(
                        expense_id=db_expense.id,
                        user_id=split.user_id,
                        amount=split.amount,
                        receipt_item_id=item_id,
                    )
                    for split in item.splits
                ]
            )

    db.add_all(splits)
    await db.flush()

    member_expenses = [
        (
            MemberExpense(
                id=split.user_id,
                balance=(
                    -split.amount
                    if split.user_id != expense_data.payer_id
                    else expense_data.amount - split.amount
                ),
                expense=split.amount,
            )
        )
        for split in expense_data.splits
    ]

    await apply_expense(expense_data.group_id, member_expenses, db)
    await refresh_debt(expense_data.group_id, db)

    return ExpenseRead(
        id=db_expense.id,
        payer_id=db_expense.payer_id,
        group_id=db_expense.group_id,
        amount=db_expense.amount,
        description=db_expense.description or "",
        category=db_expense.category,
        created_at=db_expense.created_at,
        receipt_image_url=db_expense.receipt_image_url,
        splits=[
            ExpenseSplitRead(
                id=split.id,
                expense_id=db_expense.id,
                user_id=split.user_id,
                amount=split.amount,
                created_at=split.created_at,
            )
            for split in splits
            if split.receipt_item_id is None
        ],
        items=[
            ReceiptItemRead(
                id=item.id,
                expense_id=db_expense.id,
                name=item.name,
                price=item.price,
                created_at=item.created_at,
                splits=[
                    ExpenseSplitRead(
                        id=split.id,
                        expense_id=db_expense.id,
                        user_id=split.user_id,
                        amount=split.amount,
                        created_at=split.created_at,
                        receipt_item_id=split.receipt_item_id,
                    )
                    for split in splits
                    if split.receipt_item_id == item.id
                ],
            )
            for item in db_items
        ],
    )


async def get_expense(expense_id: uuid.UUID, db: AsyncSession) -> ExpenseRead | None:
    stmt = (
        select(DBExpense)
        .where(DBExpense.id == expense_id)
        .options(
            selectinload(DBExpense.expense_split),
            selectinload(DBExpense.receipt_item).selectinload(
                DBReceiptItem.expense_split
            ),
        )
    )
    result = await db.execute(stmt)
    db_expense = result.scalar_one_or_none()

    if not db_expense:
        return None

    return ExpenseRead(
        id=db_expense.id,
        payer_id=db_expense.payer_id,
        group_id=db_expense.group_id,
        amount=db_expense.amount,
        description=db_expense.description or "",
        category=db_expense.category,
        created_at=db_expense.created_at,
        receipt_image_url=db_expense.receipt_image_url,
        splits=[
            ExpenseSplitRead(
                id=split.id,
                expense_id=db_expense.id,
                user_id=split.user_id,
                amount=split.amount,
                created_at=split.created_at,
            )
            for split in db_expense.expense_split
            if split.receipt_item_id is None
        ],
        items=[
            ReceiptItemRead(
                id=item.id,
                expense_id=db_expense.id,
                name=item.name,
                price=item.price,
                created_at=item.created_at,
                splits=[
                    ExpenseSplitRead(
                        id=split.id,
                        expense_id=db_expense.id,
                        user_id=split.user_id,
                        amount=split.amount,
                        created_at=split.created_at,
                        receipt_item_id=split.receipt_item_id,
                    )
                    for split in item.expense_split
                ],
            )
            for item in db_expense.receipt_item
        ],
    )


async def delete_expense(expense_id: uuid.UUID, db: AsyncSession) -> bool:
    stmt = (
        select(DBExpense)
        .where(DBExpense.id == expense_id)
        .options(
            selectinload(DBExpense.expense_split),
            selectinload(DBExpense.receipt_item).selectinload(
                DBReceiptItem.expense_split
            ),
        )
    )
    result = await db.execute(stmt)
    db_expense = result.scalar_one_or_none()

    if not db_expense:
        return False

    member_expenses = []
    old_splits = [
        split for split in db_expense.expense_split if split.receipt_item_id is None
    ]

    old_user_totals = {}
    for split in old_splits:
        old_user_totals[split.user_id] = (
            old_user_totals.get(split.user_id, 0.0) + split.amount
        )

    for user_id, amount in old_user_totals.items():
        member_expenses.append(
            MemberExpense(
                id=user_id,
                balance=(
                    amount
                    if user_id != db_expense.payer_id
                    else -(db_expense.amount - amount)
                ),
                expense=-amount,
            )
        )

    if member_expenses:
        await apply_expense(db_expense.group_id, member_expenses, db)

    await db.delete(db_expense)
    await db.flush()

    await refresh_debt(db_expense.group_id, db)

    return True


async def update_expense(
    expense_id: uuid.UUID, expense_data: ExpenseCreate, db: AsyncSession
) -> ExpenseRead | None:
    # 1. Fetch the existing expense with its splits and items
    stmt = (
        select(DBExpense)
        .where(DBExpense.id == expense_id)
        .options(
            selectinload(DBExpense.expense_split),
            selectinload(DBExpense.receipt_item).selectinload(
                DBReceiptItem.expense_split
            ),
        )
    )
    result = await db.execute(stmt)
    db_expense = result.scalar_one_or_none()

    if not db_expense:
        return None

    # 2. Reverse the old balances
    # Calculate old splits (only top-level splits, since they are the sum of item splits)
    old_splits = [
        split for split in db_expense.expense_split if split.receipt_item_id is None
    ]

    # Group old splits by user to reverse them
    old_user_totals = {}
    for split in old_splits:
        old_user_totals[split.user_id] = (
            old_user_totals.get(split.user_id, 0.0) + split.amount
        )

    old_member_expenses = []
    for user_id, amount in old_user_totals.items():
        old_member_expenses.append(
            MemberExpense(
                id=user_id,
                balance=(
                    amount
                    if user_id != db_expense.payer_id
                    else -(db_expense.amount - amount)
                ),
                expense=-amount,
            )
        )

    if old_member_expenses:
        await apply_expense(db_expense.group_id, old_member_expenses, db)

    # 3. Delete old items and splits (cascade will handle splits if configured, but explicit is safer)
    await db.execute(
        delete(DBExpenseSplit).where(DBExpenseSplit.expense_id == expense_id)
    )
    await db.execute(
        delete(DBReceiptItem).where(DBReceiptItem.expense_id == expense_id)
    )

    # 4. Update the main expense record
    db_expense.payer_id = expense_data.payer_id
    db_expense.group_id = expense_data.group_id
    db_expense.receipt_image_url = expense_data.receipt_image_url
    db_expense.amount = expense_data.amount
    db_expense.description = expense_data.description
    db_expense.category = expense_data.category

    await db.flush()

    # 5. Recreate items and splits (similar to add_expense)
    db_items = []
    if expense_data.items:
        db_items = [
            DBReceiptItem(expense_id=db_expense.id, name=item.name, price=item.price)
            for item in expense_data.items
        ]
        db.add_all(db_items)
        await db.flush()

    splits = [
        DBExpenseSplit(
            expense_id=db_expense.id, user_id=split.user_id, amount=split.amount
        )
        for split in expense_data.splits
    ]

    if expense_data.items:
        item_ids = [item.id for item in db_items]
        for item, item_id in zip(expense_data.items or [], item_ids):
            splits.extend(
                [
                    DBExpenseSplit(
                        expense_id=db_expense.id,
                        user_id=split.user_id,
                        amount=split.amount,
                        receipt_item_id=item_id,
                    )
                    for split in item.splits
                ]
            )

    db.add_all(splits)
    await db.flush()

    # 6. Apply new balances
    new_member_expenses = [
        (
            MemberExpense(
                id=split.user_id,
                balance=(
                    -split.amount
                    if split.user_id != expense_data.payer_id
                    else expense_data.amount - split.amount
                ),
                expense=split.amount,
            )
        )
        for split in expense_data.splits
    ]

    await apply_expense(expense_data.group_id, new_member_expenses, db)

    # 7. Refresh debts for the group
    await refresh_debt(expense_data.group_id, db)

    # 8. Return the updated expense
    return await get_expense(expense_id, db)
