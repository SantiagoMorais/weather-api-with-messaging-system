package orchestrator

import (
	"fmt"
	"log"
	"strings"
	"time"
	"worker/config"
	"worker/http"
	"worker/types"
)

func HandlePayload(cfg *config.Config, payload types.FullWeatherPayload) error {
	log.Printf("Processing weather log for timestamp: %s", payload.CreatedAt)
	
	const maxRetries = 5
	baseDelay := 2 * time.Second
	
	for attempt := 1; attempt <= maxRetries; attempt++ {
		log.Printf("Attempt %d/%d: Sending payload to NestJS API...", attempt, maxRetries)
		
		err := http.SendWeatherLog(cfg, payload)
				
		if err == nil {
			log.Println("✔ Successfully sent payload to API")
			return nil
		}

		log.Printf("Attempt %d failed: %v", attempt, err)

        if strings.Contains(err.Error(), "409 Conflict") {
            log.Println("! Conflito (409) detectado. Interrompendo retries imediatamente. Dados já foram registrados.")
            return nil 
        }

		if attempt < maxRetries {
			delay := baseDelay * time.Duration(1<<(attempt-1))
			log.Printf("Retrying in %v...", delay)
			time.Sleep(delay)
		}
	}

	return fmt.Errorf("persistent failure to send payload after %d retries", maxRetries)
}