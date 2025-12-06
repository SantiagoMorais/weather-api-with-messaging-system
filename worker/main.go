package main

import (
	"worker/config"
	"worker/orchestrator"
	"worker/rabbitmq"
	"worker/types"
)

func main() {
    cfg := config.LoadConfig()

    rabbitmq.ConsumeWeatherQueue(cfg, func(payload types.FullWeatherPayload) {
        orchestrator.HandlePayload(cfg, payload)
    })
}
