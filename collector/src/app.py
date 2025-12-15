from src.openmeteo_client import fetch_weather
from src.payload import build_payload
from src.rabbitmq import send_message
import schedule
import time
from pika.exceptions import AMQPConnectionError

import sys
sys.path.append("/app")

def main():
    current, forecast, meta = fetch_weather()
    payload = build_payload(current, forecast, meta)
    send_message(payload)
    print("✔ Job executed successfully")

def wait_for_rabbit(retries=10, delay=5):
    test_payload = {"test": "ping"}
    for i in range(retries):
        try:
            send_message(test_payload)
            print("RabbitMQ ready")
            return
        except AMQPConnectionError:
            print(f"RabbitMQ not ready, retry {i+1}/{retries}, waiting {delay}s...")
            time.sleep(delay)
    raise RuntimeError("RabbitMQ unavailable after retries")

wait_for_rabbit();

main() # Initialize the first time

schedule.every().hour.at(":00").do(main)

print("Collector begin. Waiting the time...")

while True:
    schedule.run_pending()
    time.sleep(1)
