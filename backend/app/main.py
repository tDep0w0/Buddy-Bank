from fastapi import FastAPI
from app.api import receipts

app = FastAPI()

app.include_router(receipts.router, prefix="/api/receipts", tags=["receipts"])
