import pika
import json
from src.settings import settings

def send_message(payload: dict):
    params = pika.URLParameters(settings.RABBITMQ_URL)

    connection = pika.BlockingConnection(params)
    channel = connection.channel()
    
    channel.queue_declare(queue=settings.RABBITMQ_QUEUE, durable=True)

    message = json.dumps(payload)

    channel.basic_publish(
        exchange="",
        routing_key=settings.RABBITMQ_QUEUE,
        body=message.encode("utf-8")
    )

    print("✔ Sent payload to RabbitMQ")
    connection.close()