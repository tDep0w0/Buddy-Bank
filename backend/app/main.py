from fastapi import FastAPI
from app.api import receipts
from app.api import search_users

app = FastAPI()

app.include_router(receipts.router, prefix="/api/receipts", tags=["receipts"])
app.include_router(search_users.router, prefix ="/api/search_users", tags=["search_users"])
