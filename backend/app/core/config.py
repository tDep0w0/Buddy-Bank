from pydantic_settings import BaseSettings, SettingsConfigDict
from supabase import create_client, Client


class Settings(BaseSettings):
    DB_USER: str = ""
    DB_PASSWORD: str = ""
    DB_HOST: str = ""
    DB_PORT: str = ""
    DB_NAME: str = ""
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    OPENROUTER_API_KEY: str = ""

    @property
    def ASYNC_DATABASE_URI(self) -> str:
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}?ssl=require"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
