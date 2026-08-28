## Topic

A **topic** is a logical stream of related messages inside a Kafka cluster.

```text
Kafka Cluster
│
└── Topic
````

A topic is divided into one or more **partitions**.

Check which topics there are in entire cluster (assuming 9092 is one of broker)
``` shell
cd C:\kafka
.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --list
```

## Partition

A **partition** is an ordered sequence of messages inside a topic.

```text
topic
│
├── Partition 0
├── Partition 1
└── Partition 2
```

Each partition has its own ordering.

```text
Partition 0 → Order(100) → Order(103) → Order(106) → Order(109)
Partition 1 → Order(101) → Order(104) → Order(107)
Partition 2 → Order(102) → Order(105) → Order(108)
```

Partitions allow Kafka to distribute a topic's data and processing across multiple brokers.

So each Broker is just a server which is storing the request and distributing it across other microservices and in case microservice is down, it stores it for processing later. It does not process it in itself.

See Partitions of a Topic
``` shell
cd C:\kafka
.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --describe --topic recsys.user-events
```

# Creating Topic & Partitions

Creating a Topic Syntax
``` shell
.\bin\windows\kafka-topics.bat --bootstrap-server <BROKER> --create --topic <TOPIC_NAME> --partitions <N> --replication-factor <N>
```

Eg. 
``` shell
.\bin\windows\kafka-topics.bat --bootstrap-server localhost:9092 --create --topic recsys.user-events --partitions 3 --replication-factor 1
```

Here partitions are 3 so any 3 brokers will be assigned from the cluster to work on these partitions. localhost 9092 is just an entry point to discover the cluster.