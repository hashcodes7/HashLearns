# Kafka Implementation Details for BigKart

This document provides a comprehensive, step-by-step breakdown of the Kafka configuration and implementation for asynchronous communication between the `bigkart_admin` (producer) and `bigkart_customer` (consumer) applications.

## 1. Dependencies Added

The following dependency was added to the `pom.xml` files of **both** `bigkart_admin` and `bigkart_customer` projects to enable Kafka support:

```xml
<!-- Spring Kafka for Producer and Consumer support -->
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
```

## 2. Configuration Changes (`application.properties`)

### In `bigkart_admin` (Producer)
Added configuration to point the producer to the Kafka broker:
```properties
spring.kafka.producer.bootstrap-servers=localhost:9092
```

### In `bigkart_customer` (Consumer)
Added configurations for the Kafka broker, consumer group, and changed the server port to avoid conflicts with the admin app:
```properties
spring.kafka.consumer.bootstrap-servers=localhost:9092
spring.kafka.consumer.group-id=bigkart-customer-group
```

## 3. Kafka Producer Implementation (`bigkart_admin`)

### `KafkaProducerService.java`
Created a service class to handle sending messages to the Kafka topic.
```java
package com.sarvu.bigkart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendIncrementEvent(int number) {
        kafkaTemplate.send("increment-topic", String.valueOf(number));
    }
}
```

## 4. Kafka Consumer Implementation (`bigkart_customer`)

### `KafkaConsumerService.java`
Created a service to listen to the Kafka topic and process the consumed messages.
```java
package com.sarvu.bigkart;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {
    private int latestNumber = 0;

    @KafkaListener(topics = "increment-topic", groupId = "bigkart-customer-group")
    public void consume(String message) {
        try {
            this.latestNumber = Integer.parseInt(message);
            System.out.println("Consumed new number: " + this.latestNumber);
        } catch (NumberFormatException e) {
            System.err.println("Invalid number format received");
        }
    }  

    public int getLatestNumber() {
        return latestNumber;
    }
}
```

## 5. Execution Steps

1. **Start Zookeeper**: `zookeeper-server-start.bat .\config\zookeeper.properties`
2. **Start Kafka**: `kafka-server-start.bat .\config\server.properties`
3. **Run Admin Application**: Producer application starts on `localhost:8080`.
4. **Run Customer Application**: Consumer application starts on `localhost:8081` and begins listening to `increment-topic`.
