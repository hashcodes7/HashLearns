# Local Infrastructure

For local development and testing, we use Docker Compose to spin up the necessary infrastructure without polluting the host machine.

## docker-compose.yml

The project includes a `docker-compose.yml` file configured with two main services:
1. **Zookeeper**: Required for broker coordination.
2. **Kafka**: The message broker itself, exposed on port `9092` to the host machine.

## Starting the Infrastructure

To start the local environment:
```bash
docker-compose up -d
```

This ensures that when the FastAPI application starts, it can successfully connect to `localhost:9092` and begin listening for events.
