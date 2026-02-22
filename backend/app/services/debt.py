from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from app.db.models import UserGroup, Debt
import uuid


async def refresh_debt(group_id: uuid.UUID, db: AsyncSession):
    result = await db.execute(select(UserGroup).where(UserGroup.group_id == group_id))
    members = result.scalars().all()

    debtors = []
    creditors = []

    for member in members:
        if member.balance < -0.001:
            debtors.append({"user_id": member.user_id, "amount": abs(member.balance)})
        elif member.balance > 0.001:
            creditors.append({"user_id": member.user_id, "amount": member.balance})

    debtors.sort(key=lambda x: x["amount"], reverse=True)
    creditors.sort(key=lambda x: x["amount"], reverse=True)

    new_debts = []
    i, j = 0, 0

    while i < len(debtors) and j < len(creditors):
        debtor = debtors[i]
        creditor = creditors[j]

        settle_amount = min(debtor["amount"], creditor["amount"])

        new_debts.append(
            Debt(
                group_id=group_id,
                borrower_id=debtor["user_id"],
                lender_id=creditor["user_id"],
                amount=round(settle_amount, 2),
                is_paid=False,
            )
        )

        debtor["amount"] -= settle_amount
        creditor["amount"] -= settle_amount

        if debtor["amount"] < 0.001:
            i += 1
        if creditor["amount"] < 0.001:
            j += 1

    await db.execute(
        delete(Debt).where(Debt.group_id == group_id).where(Debt.is_paid == False)
    )

    if new_debts:
        db.add_all(new_debts)

    await db.flush()
