import json
import requests
from kafka import KafkaConsumer
from jsonschema import validate, ValidationError

# Configuration
schema_registry_url = "http://localhost:8081"
topic_name = "test"
kafka_bootstrap_servers = "localhost:9092"
group_id = "my_group_unique"  # Use a unique group_id to read from the beginning

# Fetch the latest schema from the Schema Registry
def get_latest_schema(schema_registry_url, topic_name):
    subject = f"{topic_name}-value"
    url = f"{schema_registry_url}/subjects/{subject}/versions/latest"
    response = requests.get(url)
    response.raise_for_status()
    schema_data = response.json()
    schema_str = schema_data['schema']
    schema_json = json.loads(schema_str)
    return schema_json

# Get the schema for the topic
try:
    schema = get_latest_schema(schema_registry_url, topic_name)
    print(f"Schema fetched successfully: {schema}")
except Exception as e:
    print(f"Failed to fetch schema: {e}")
    exit(1)

# Function to deserialize message value
def deserialize_message(message_value):
    # Strip the first 5 bytes of Confluent Schema Registry prefix
    if message_value[:1] == b'\x00':
        message_value = message_value[5:]
    try:
        return json.loads(message_value.decode('utf-8'))
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {e}")
        return None

# Create Kafka consumer
consumer = KafkaConsumer(
    topic_name,
    bootstrap_servers=kafka_bootstrap_servers,
    group_id=group_id,
    auto_offset_reset="earliest",
    enable_auto_commit=False  # Disable auto-commit to avoid updating offsets
)

# Seek to the beginning of each partition to consume all messages from the start
consumer.poll(0)  # Initiate connection to the cluster
for partition in consumer.assignment():
    consumer.seek_to_beginning(partition)

# Consuming messages
for message in consumer:
    deserialized_value = deserialize_message(message.value)
    if deserialized_value is None:
        print("Skipping message due to deserialization error")
        continue

    print(f"Received and deserialized message: {deserialized_value}")

    # Validate and process the message using schema
    # try:
    #     validate(instance=deserialized_value, schema=schema)
    #     print(f"Validated message: {deserialized_value}")
    # except ValidationError as ve:
    #     print(f"Message validation failed: {ve}")
