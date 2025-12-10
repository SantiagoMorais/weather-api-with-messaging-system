from pydantic_settings import BaseSettings, SettingsConfigDict
import os

ENV_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))

class Settings(BaseSettings):
    OPENMETEO_BASE: str 
    OPENMETEO_LAT: float
    OPENMETEO_LON: float 
    TIMEZONE_API: str

    RABBITMQ_HOST: str
    RABBITMQ_QUEUE: str
    PYTHONPATH: str

    model_config = SettingsConfigDict(env_file=ENV_PATH, env_file_encoding="utf-8", extra="ignore")

settings = Settings()
