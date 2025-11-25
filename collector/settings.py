from pydantic_settings import BaseSettings, SettingsConfigDict
import os

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOTENV_PATH = os.path.join(ROOT_DIR, ".env")

class Settings(BaseSettings):
    OPEN_METEO_BASE: str
    OPEN_METEO_LAT: float
    OPEN_METEO_LON: float
    TIMEZONE_API: str

    RABBITMQ_USER: str
    RABBITMQ_PASS: str
    RABBITMQ_HOST: str
    RABBITMQ_URL: str

    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")

settings = Settings()
