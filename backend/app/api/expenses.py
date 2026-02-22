from fastapi import APIRouter, Depends, HTTPException, status
from app.services.expense import (
    add_expense,
    get_expense,
    update_expense as update_expense_service,
    delete_expense as delete_expense_service,
)
from app.schemas.expense import ExpenseCreate, ExpenseRead
from app.db.deps import get_db
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

router = APIRouter(tags=["expenses"])


@router.post("/", response_model=ExpenseRead)
async def create_expense(expense: ExpenseCreate, db: AsyncSession = Depends(get_db)):
    new_expense = await add_expense(expense, db)
    return new_expense


@router.get("/{expense_id}", response_model=ExpenseRead)
async def read_expense(expense_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    expense = await get_expense(expense_id, db)
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found"
        )
    return expense


@router.put("/{expense_id}", response_model=ExpenseRead)
async def update_expense(
    expense_id: uuid.UUID,
    expense_data: ExpenseCreate,
    db: AsyncSession = Depends(get_db),
):
    updated_expense = await update_expense_service(expense_id, expense_data, db)
    if not updated_expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found"
        )
    return updated_expense


@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(expense_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    success = await delete_expense_service(expense_id, db)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found"
        )
    return None
