package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
    RabbitMQURL   string
    QueueName     string
    APIBaseURL    string
    WorkerAPIKey  string
}

func LoadConfig() *Config {
    _ = godotenv.Load(".env")

    return &Config{
        RabbitMQURL:    getEnv("RABBITMQ_URL", "amqp://guest:guest@localhost:5672/"),
        QueueName:      getEnv("RABBITMQ_QUEUE", "weather_queue"),
        APIBaseURL:     getEnv("NEST_API_URL", "http://localhost:3333"),
        WorkerAPIKey:   getEnv("WORKER_API_KEY", ""),
    }
}

func getEnv(key, fallback string) string {
    if value, exists := os.LookupEnv(key); exists {
        return value
    }
    return fallback
}