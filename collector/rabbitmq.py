import pika
import json
from settings import settings

def send_message(payload: dict):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host=settings.RABBITMQ_HOST)
    )

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