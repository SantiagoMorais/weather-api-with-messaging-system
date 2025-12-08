from src.openmeteo_client import fetch_weather
from src.payload import build_payload
from src.rabbitmq import send_message
import schedule
import time

import sys
sys.path.append("/app")

def main():
    current, forecast, meta = fetch_weather()
    payload = build_payload(current, forecast, meta)
    send_message(payload)
    print("✔ Job executed successfully")

main() # Initialize the first time

schedule.every().hour.at(":00").do(main)

print("Collector begin. Waiting the time...")

while True:
    schedule.run_pending()
    time.sleep(1)
