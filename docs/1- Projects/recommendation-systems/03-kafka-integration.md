# Kafka Integration

To support the self-adjusting nature of the recommendation system, we integrate Kafka for real-time event processing.

## The Consumer Skeleton

The application uses `aiokafka`, an asyncio-compatible Kafka client, to ensure the consumer does not block the FastAPI event loop.

- **`core/kafka_consumer.py`**: Defines the `RecommendationKafkaConsumer` class.
- **Consumer Group**: The consumer operates under a specific `group_id`, allowing it to track offsets and pick up where it left off in case of a restart.
- **Background Task**: The consumer's `consume` loop runs as an `asyncio` background task started during the FastAPI startup event.

## Self-Adjusting Mechanism

As events (like user clicks, purchases, or new inventory) are published to the `recommendation_events` topic, the consumer ingests them. In a fully implemented system, these events would trigger logic to update user profiles, adjust item weights, or retrain models in near real-time.
