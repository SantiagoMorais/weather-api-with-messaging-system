package rabbitmq

import (
	"encoding/json"
	"fmt"
	"log"
	"time"
	"worker/config"
	"worker/types"

	"github.com/streadway/amqp"
)


func ConsumeWeatherQueue(cfg *config.Config, handleMessage func(types.FullWeatherPayload)) {
    conn, err := amqp.Dial(cfg.RabbitMQURL)
    if err != nil {
        log.Fatalf("Failed to connect to RabbitMQ: %v", err)
    }
    defer conn.Close()

    ch, err := conn.Channel()
    if err != nil {
        log.Fatalf("Failed to open channel: %v", err)
    }
    defer ch.Close()

     _, err = ch.QueueDeclare(
        cfg.QueueName,
        true,  // durable
        false, // auto-delete
        false, // exclusive
        false, // no-wait
        nil,
    )
    if err != nil {
        log.Fatalf("Failed to declare queue: %v", err)
    }

    msgs, err := ch.Consume(
        cfg.QueueName,
        "",
        false, 
        false,
        false,
        false,
        nil,
    )
    if err != nil {
        log.Fatalf("Failed to register consumer: %v", err)
    }

    forever := make(chan bool)

    go func() {
        for d := range msgs {
            var raw types.PythonWeatherPayload
            if err := json.Unmarshal(d.Body, &raw); err != nil {
                log.Printf("Error unmarshalling message: %v", err)
                d.Nack(false, false)
                continue
            }
        
            currentForecastStats := make([]types.APIObservationStats, len(raw.Forecast24h))
            for i, obs := range raw.Forecast24h {
                currentForecastStats[i] = toAPIObservationStats(obs)
            }
            
            converted := types.FullWeatherPayload{
                CreatedAt:              time.Now().Format(time.RFC3339),
                Location:               raw.Location,
                HourlyObservationStats: toAPIObservationStats(raw.Current),
                CurrentForecastStats:   currentForecastStats,
            }

            handleMessage(converted)
            
            d.Ack(false)
        }
    }()

    fmt.Println("Worker running. Waiting for messages...")
    <-forever
}