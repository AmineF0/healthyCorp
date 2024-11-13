import os
from confluent_kafka import Consumer
from confluent_kafka.schema_registry import SchemaRegistryClient
from confluent_kafka.schema_registry.json_schema import JSONDeserializer

# Configure Schema Registry client
schema_registry_url = "http://localhost:8081"
schema_registry_client = SchemaRegistryClient({"url": schema_registry_url})

# Get latest schema for the topic
topic_name = "test"
schema_id = schema_registry_client.get_latest_version(f"{topic_name}-value").schema_id  # specify -value suffix
schema_str = schema_registry_client.get_schema(schema_id).schema_str
print(f"Schema ID: {schema_id}")
print(f"Schema: {schema_str}")
# Deserialize messages using schema
json_deserializer = JSONDeserializer(schema_str)

# Create Kafka consumer
consumer = Consumer({
    "bootstrap.servers": "localhost:9092",
    "group.id": "my_group",
    "auto.offset.reset": "earliest"
})

# Subscribe to topic
consumer.subscribe(['test'])

while True:
    # Consume message from Kafka
    msg = consumer.poll(1.0)
    print('message', msg)
    if msg is None:
        continue

    # Deserialize message using schema
    deserialized_msg = json_deserializer(msg.value(), None)

    # Process deserialized message
    print(deserialized_msg)
