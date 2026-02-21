from fastapi import FastAPI
from app.api import receipts
from app.api import users

app = FastAPI()

app.include_router(receipts.router, prefix="/api/receipts", tags=["receipts"])
app.include_router(users.router, prefix ="/api/users", tags=["users"])


