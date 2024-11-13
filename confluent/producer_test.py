from confluent_kafka import Producer
from confluent_kafka.serialization import SerializationContext, MessageField
from confluent_kafka.schema_registry import SchemaRegistryClient
from confluent_kafka.schema_registry.json_schema import JSONSerializer, Schema
from schemas import user_schema

config = {
    'bootstrap.servers': 'localhost:9092'
}

sr_config = {
    'url': 'http://localhost:8081'  
}

def parse_to_dict(data, ctx):
    return {
        "name": data.get("name", "N/A"),
        "age": data.get("age", "N/A"),
        "department": data.get("department", "N/A")
    }

def delivery_report(err, event):
    if err is not None:
        print(f'Delivery failed on reading for {event.key().decode("utf8")}: {err}')
    else:
        print(f'user data for {event.key().decode("utf8")} produced to {event.topic()}')

test_data = [
    {"name": "John", "age": 25, "department": "IT"},
    {"name": "Jane", "age": 26, "department": "HR"},
    {"name": "Jack", "age": 27, "department": "Finance"},
    {"name": "Jack", "age": 27, "department": "IT"},
]

topic = 'test'
subject = f'{topic}-value'  # Define the subject for the schema in the Schema Registry

if __name__ == "__main__":
    schema_registry_client = SchemaRegistryClient(sr_config)
    
    # Register the schema in the Schema Registry
    schema = Schema(user_schema, schema_type="JSON")
    schema_registry_client.register_schema(subject, schema)
    
    # Create the JSON serializer using the registered schema
    json_serializer = JSONSerializer(user_schema,
                                     schema_registry_client,
                                     parse_to_dict)
    
    producer = Producer(config)
    for data in test_data:
        producer.produce(
            topic=topic,
            key=str(data.get("name")),
            value=json_serializer(data, SerializationContext(topic, MessageField.VALUE)),
            on_delivery=delivery_report
        )
    producer.flush()
