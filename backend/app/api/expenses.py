from fastapi import APIRouter, Depends
from app.services.expense import add_expense
from app.schemas.expense import ExpenseCreate, ExpenseRead
from app.db.deps import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(tags=["expenses"])


@router.post("/", response_model=ExpenseRead)
async def create_expense(expense: ExpenseCreate, db: AsyncSession = Depends(get_db)):
    new_expense = await add_expense(expense, db)
    return new_expense
