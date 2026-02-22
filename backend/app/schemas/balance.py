from pydantic import BaseModel
import uuid


class MemberExpense(BaseModel):
    id: uuid.UUID
    balance: float
    expense: float
