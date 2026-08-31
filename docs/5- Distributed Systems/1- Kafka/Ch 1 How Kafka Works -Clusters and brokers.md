
Kafka has a Cluster . 
Every cluster has multiple brokers and multiple topics
they dont belong to anyone, they simply belong to the cluster itself.

# Checking if there is a cluster
```shell
cd C:\kafka
.\bin\windows\kafka-cluster.bat cluster-id --bootstrap-server localhost:9092
```


## Making a broker
### Making a new broker in new cluster
a new broker is made by creating a server.properties file at kafka\config folder then we register it inside a cluster 
```
.\bin\windows\kafka-storage.bat format --standalone --cluster-id clus1 --config .\config\server.properties
```

This will create a new cluster with id `clus1`

### making a broker in existing cluster
we just have to make sure there isnt collision with another broker and these settings are different
- unique node.id 
- unique network identity
- unique storage
``` shell
.\bin\windows\kafka-storage.bat format --cluster-id <EXISTING_CLUSTER_ID> --config .\config\server2.properties
```


## Starting a Broker
start the broker by simply running this with broker's server.property file
```
.\bin\windows\kafka-server-start.bat .\config\server.properties
```


# Deleting a broker
Broker can be deleted by simply running this command Replace only: `server2.properties`

``` shell
$CONFIG=".\config\server2.properties"; $DIR=(Get-Content $CONFIG | Where-Object {$_ -match '^log\.dirs='} | ForEach-Object {($_ -split '=',2)[1].Trim()}); Remove-Item -Recurse -Force $DIR
```