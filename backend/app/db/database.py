import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.core.config import settings

engine = create_async_engine(
    settings.ASYNC_DATABASE_URI,
    pool_size=10,
    max_overflow=5,
    pool_pre_ping=True,
    echo=False,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)


async def test_connection():
    try:
        async with engine.begin() as conn:
            print("Connection successful")
    except Exception as e:
        print(f"Failed to connect: {e}")


if __name__ == "__main__":
    asyncio.run(test_connection())
