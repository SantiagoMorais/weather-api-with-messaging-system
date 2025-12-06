package orchestrator

import (
	"log"
	"worker/config"
	"worker/http"
	"worker/types"
)

func HandlePayload(cfg *config.Config, payload types.FullWeatherPayload) {
    log.Printf("Processing weather log for timestamp: %s", payload.CreatedAt)

    if err := http.SendWeatherLog(cfg, payload); err != nil {
        log.Printf("Error sending to API: %v", err)
    } else {
        log.Println("✔ Successfully sent payload to API")
    }
}
