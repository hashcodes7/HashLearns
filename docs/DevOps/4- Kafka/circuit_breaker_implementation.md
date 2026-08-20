# Circuit Breaker Implementation Guide

This document explains the steps taken to implement a Circuit Breaker pattern in the `bigkart_customer` service, allowing it to gracefully handle failures when the `bigkart_admin` service is unreachable. We used **Spring Cloud Circuit Breaker with Resilience4j**.

## 1. Added Dependencies (`pom.xml`)
To enable Resilience4j and its features, we added three crucial dependencies to the project's `pom.xml`:

- **`spring-cloud-starter-circuitbreaker-resilience4j`**: The core dependency that brings in the Resilience4j library for Circuit Breakers.
- **`spring-boot-starter-aop`**: Resilience4j uses Spring AOP (Aspect-Oriented Programming) under the hood to intercept method calls annotated with `@CircuitBreaker`. Without this dependency, the circuit breaker annotations will not function. We explicitly pinned version `3.1.2` to resolve a dependency tree build issue.
- **`spring-boot-starter-actuator`**: This exposes health and metrics endpoints for the application, allowing us to monitor the current state (closed, open, half-open) of the circuit breaker.

## 2. Added Circuit Breaker Configuration (`application.properties`)
We defined the behavior of our circuit breaker in `application.properties`:

```properties
# Exposes actuator endpoints to monitor the circuit breaker's status
management.endpoints.web.exposure.include=health,info,metrics,circuitbreakers
management.endpoint.health.show-details=always

# Defines the URL for the external admin service
bigkart.admin.url=http://localhost:8081

# Resilience4j Rules for "adminService" instance
resilience4j.circuitbreaker.instances.adminService.registerHealthIndicator=true
resilience4j.circuitbreaker.instances.adminService.slidingWindowType=COUNT_BASED
resilience4j.circuitbreaker.instances.adminService.slidingWindowSize=10
resilience4j.circuitbreaker.instances.adminService.minimumNumberOfCalls=5
resilience4j.circuitbreaker.instances.adminService.waitDurationInOpenState=5s
resilience4j.circuitbreaker.instances.adminService.failureRateThreshold=50
resilience4j.circuitbreaker.instances.adminService.permittedNumberOfCallsInHalfOpenState=3
```

**Explanation of properties:**
- **slidingWindowSize=10**: The circuit breaker evaluates the last 10 calls to determine the failure rate.
- **minimumNumberOfCalls=5**: It requires at least 5 calls to happen before calculating the failure rate.
- **failureRateThreshold=50**: If 50% or more of the calls fail (e.g., timeout or service down), the circuit opens, rejecting all subsequent requests instantly.
- **waitDurationInOpenState=5s**: When open, the circuit breaker waits 5 seconds before transitioning to the "Half-Open" state to test if the service has recovered.

## 3. Created the REST Client (`AdminServiceClient.java`)
We created a dedicated service layer to handle communication with the `bigkart_admin` microservice:

- Used `@Service` to register it as a Spring Bean.
- Injected the `bigkart.admin.url` property using `@Value`.
- Created the `getAdminHello()` method, which uses `RestTemplate` to make an HTTP GET request to the admin service.
- **Circuit Breaker Logic:** We annotated this method with `@CircuitBreaker(name = "adminService", fallbackMethod = "adminServiceFallback")`.
- **Fallback Method:** We defined `adminServiceFallback(Exception e)`. If `bigkart_admin` is down or times out, this method executes immediately (or intercepts open-circuit calls) to return a safe fallback message: `"Admin service is currently down. Please try again later. (Fallback Response)"`.

## 4. Configured `RestTemplate` (`BigkartCustomerApplication.java`)
`RestTemplate` is not auto-configured by default in a way that we can just inject it. So, we defined a `@Bean` method returning `new RestTemplate()` in the main application class. This makes it available for auto-wiring inside `AdminServiceClient`.

## 5. Exposed a Test Endpoint (`HelloController.java`)
Finally, to test the entire integration, we added a new endpoint `/admin-hello` inside `HelloController`. This endpoint auto-wires `AdminServiceClient` and invokes its `getAdminHello()` method.

## How to Test
1. Start both the `bigkart_admin` (port 8081) and `bigkart_customer` (port 8080) applications.
2. Navigate to `http://localhost:8080/admin-hello`. You will see the successful response from the admin service.
3. Stop the `bigkart_admin` service and hit the same URL again.
4. You will immediately receive the fallback message because the circuit breaker handles the connection failure and protects the system from hanging indefinitely.
