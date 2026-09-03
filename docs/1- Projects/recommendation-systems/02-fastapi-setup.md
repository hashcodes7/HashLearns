# FastAPI Setup

The API layer is built using FastAPI. 

## Application Structure

- **`main.py`**: The entry point of the application. It initializes the FastAPI app, configures the metadata (title, version), and defines the application lifespan. The lifespan events are crucial for starting and gracefully shutting down the background Kafka consumer alongside the web server.
- **`api/routes.py`**: Contains the route definitions. Currently, it houses the `GET /recommendations/{user_id}` endpoint which returns a structured JSON response of recommended items and their scores.

## Swagger Documentation

One of the key benefits of FastAPI is its automatic documentation generation. By running the server and navigating to `/docs`, developers can interact with the Swagger UI to test the recommendation endpoints directly from the browser.
