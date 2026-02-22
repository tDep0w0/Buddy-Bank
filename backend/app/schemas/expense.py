from pydantic import BaseModel
from typing import Optional
from app.db.models import ExpenseCategory
import uuid
import datetime


class ExpenseCreate(BaseModel):
    payer_id: uuid.UUID
    group_id: uuid.UUID
    receipt_image_url: Optional[str] = None
    amount: float
    description: str
    category: ExpenseCategory
    items: Optional[list[ReceiptItemCreate]] = None
    splits: list[ExpenseSplitCreate]


class ReceiptItemCreate(BaseModel):
    name: str
    price: float
    splits: list[ExpenseSplitCreate]


class ExpenseSplitCreate(BaseModel):
    user_id: uuid.UUID
    amount: float


class ExpenseRead(BaseModel):
    id: uuid.UUID
    payer_id: uuid.UUID
    group_id: uuid.UUID
    receipt_image_url: Optional[str] = None
    amount: float
    description: str
    category: ExpenseCategory
    created_at: datetime.datetime
    splits: list[ExpenseSplitRead] = []
    items: list[ReceiptItemRead] = []

    class Config:
        orm_mode = True


class ExpenseSplitRead(BaseModel):
    id: uuid.UUID
    expense_id: uuid.UUID
    receipt_item_id: Optional[uuid.UUID] = None
    user_id: uuid.UUID
    amount: float
    created_at: datetime.datetime

    class Config:
        orm_mode = True


class ReceiptItemRead(BaseModel):
    id: uuid.UUID
    expense_id: uuid.UUID
    name: str
    price: float
    created_at: datetime.datetime
    splits: list[ExpenseSplitRead] = []

    class Config:
        orm_mode = True
