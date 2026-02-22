import uuid
from app.schemas.balance import MemberExpense
from app.db.models import UserGroup
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, bindparam


async def apply_expense(
    group_id: uuid.UUID, balances: list[MemberExpense], db: AsyncSession
):
    result = await db.execute(
        select(UserGroup).where(UserGroup.group_id == group_id).with_for_update()
    )
    members = result.scalars().all()
    balance_map = {
        balance.id: {"expense": balance.expense, "balance": balance.balance}
        for balance in balances
    }

    updates = [
        {
            "b_group_id": group_id,
            "b_user_id": member.user_id,
            "b_balance": member.balance + balance_map[member.user_id]["balance"],
            "b_expense": member.expense + balance_map[member.user_id]["expense"],
        }
        for member in members
    ]

    stmt = (
        update(UserGroup)
        .where(UserGroup.group_id == bindparam("b_group_id"))
        .where(UserGroup.user_id == bindparam("b_user_id"))
        .values(balance=bindparam("b_balance"), expense=bindparam("b_expense"))
        .execution_options(synchronize_session=False)
    )

    await (await db.connection()).execute(stmt, updates)
