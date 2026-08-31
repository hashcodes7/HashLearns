A **consumer group** is a group of consumers that work together to consume messages from a Kafka topic.
Each consumer in the group gets assigned **different partitions**.

```
Topic: mytopic1
	├── Partition0 ──→ Consumer 1
	├── Partition1 ──→ Consumer 2
	└── Partition2 ──→ Consumer 3

Consumer 1 + Consumer 2 + Consumer 3
             ↓
       Consumer Group
```
## Why Consumer Groups?

They allow **parallel processing** and **scaling**.
Consumers identify their group using a `group.id`.
```text
group.id = recommendation-service
```

Another application could use:

```text
group.id = analytics-service
```

If a topic has 3 partitions:

```text
3 Partitions
      ↓
3 Consumers
      ↓
Parallel processing
```

If one consumer has to process everything:

```text
P0 ─┐
P1 ─┼──→ Consumer 1
P2 ─┘
```

With 3 consumers:

```text
P0 ──→ Consumer 1
P1 ──→ Consumer 2
P2 ──→ Consumer 3
```

## Important Rule

Within a consumer group:

> **One partition can be assigned to only one consumer at a time.**

Therefore, if a topic has **3 partitions**, a consumer group can effectively use at most **3 consumers simultaneously** for that topic.

```text
3 partitions + 5 consumers

P0 → C1
P1 → C2
P2 → C3
P3 → ❌
P4 → ❌

C4 and C5 remain idle for this topic.
```

## Multiple Consumer Groups

Different consumer groups can consume the **same topic independently**.

```text
                 recsys.user-events
                    /          \
                   /            \
                  ↓              ↓
        Recommendation Group   Analytics Group
             /     \                |
           C1       C2              C3
```

Each group maintains its **own offsets**.

Therefore:

```text
Recommendation Group
→ consumes all relevant events

Analytics Group
→ independently consumes the same events
```

One group's consumption does not remove the messages for another group.

Full architecture. Kafka runs on methodology that whoever is allowed and is free, can do that action

- **Producer produces an event for a particular topic and sends it to Kafka.**  
    _(User clicked "Add to Cart")_
- **The producer determines which partition of that topic the event should go to** based on the partitioning strategy 
- **The producer sends the event to the broker that is currently the leader for that partition.**
- **The broker appends the record to the selected partition.**
- **The record gets an offset within that partition.**  
    _(e.g., `pizza.orders → Partition 1 → Offset 157`)_
- **A consumer subscribes to the topic through a consumer group.**
- **Kafka identifies the partitions of that topic that need to be consumed by that consumer group.**
- **Kafka assigns those partitions among the consumers in that consumer group.**
- **A consumer polls Kafka for records from the partitions currently assigned to it.**
- **Kafka returns the available records from those partitions to the consumer.**
- **The consumer passes the event to its microservice/business logic.**  
    _(e.g., Order Service processes "Add to Cart")_
- **After processing the record, the consumer commits its offset for the consumer group.**
- **Kafka stores that committed offset, allowing the consumer group to know where it should continue reading from.**

### Then the dynamic behavior

- **If a new consumer joins the group, Kafka may rebalance the partitions among the consumers.**
- **If a consumer leaves/crashes, Kafka may rebalance its partitions among the remaining consumers.**
- **A partition can be consumed by different consumer groups independently.**  
    For example, `pizza.orders-P1` can be consumed by both `order-processing-group` and `analytics-group`.
- **Within one consumer group, a partition is assigned to only one consumer at a time.**