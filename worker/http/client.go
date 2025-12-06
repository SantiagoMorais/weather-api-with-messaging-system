package http

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"worker/config"
	"worker/types"
)

func SendWeatherLog(cfg *config.Config, payload types.FullWeatherPayload) error {
    url := fmt.Sprintf("%s/weather-log", cfg.APIBaseURL)

    body, err := json.Marshal(payload)
    if err != nil {
        return err
    }

    req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
    if err != nil {
        return err
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("x-worker-key", cfg.WorkerAPIKey) // The worker api key to authorize the weather payload submission

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 400 {
        return fmt.Errorf("error sending data: %s", resp.Status)
    }

    return nil
}
