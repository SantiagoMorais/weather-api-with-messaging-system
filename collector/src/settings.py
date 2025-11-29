from pydantic_settings import BaseSettings, SettingsConfigDict
import os

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DOTENV_PATH = os.path.join(ROOT_DIR, ".env")

print(DOTENV_PATH)

class Settings(BaseSettings):
    OPENMETEO_BASE: str
    OPENMETEO_LAT: float
    OPENMETEO_LON: float
    TIMEZONE_API: str

    RABBITMQ_USER: str
    RABBITMQ_PASS: str
    RABBITMQ_HOST: str
    RABBITMQ_URL: str
    RABBITMQ_QUEUE: str

    model_config = SettingsConfigDict(env_file=DOTENV_PATH, env_file_encoding="utf-8", extra="ignore")

settings = Settings()
