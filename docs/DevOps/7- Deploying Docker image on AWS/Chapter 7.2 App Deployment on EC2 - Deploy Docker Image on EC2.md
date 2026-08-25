#### Lets start by installing Docker
```
sudo dnf update -y
sudo dnf install -y docker
```
![[Pasted image 20260825011547.png]]
#### Once Installed, Run docker
```
sudo systemctl start docker
```
#### Make it Start Automatically, Enable Docker
```
sudo systemctl enable docker
```

![[Pasted image 20260825011622.png]]

#### (optional)Configure to let users use docker instead of just Superuser
check your identity using command `whoami`
![[Pasted image 20260825012226.png]]

now give docker permission to yourself so you wont have to touch it with root user everytime
```
sudo usermod -aG docker <whichever user you are in above pic>
```

![[Pasted image 20260825012347.png]]


after this restart the ssm session
![[Pasted image 20260825012424.png]]
and run a new ssm session
![[Pasted image 20260825012458.png]]

and this time you should be able to run command without using root user
now we can continue with our setup

# Here we are at a special Junction. we have to make a architectural choice
## Kafka: Inside Docker vs Outside Docker

| Factor | Kafka inside Docker | Kafka outside Docker |
|---|---|---|
| Installation | Only Docker needed | Kafka installed on EC2 |
| Networking | Simple: `kafka:9092` | More configuration required |
| Deployment | `docker compose up` | Kafka managed separately |
| Reproducibility | 🟢 High | 🟡 Medium |
| EC2 cleanliness | 🟢 Clean | 🟡 Kafka files/processes on EC2 |
| BigKart fit | 🟢 **Recommended** | 🟡 Good |
| Production AWS | Usually managed Kafka (MSK) | Usually managed Kafka (MSK) |

### Our choice
**Kafka inside Docker**

```text
EC2
└── Docker Compose
     ├── bigkart_admin
     ├── bigkart_customer
     └── kafka
```
why? because we want easy manageability of everything using docker
for this we made 1 change in our app's application.properties file. 
### Whats Docker Compose
its a plugin of docker which reduces the managability of handling multiple docker images, eg one for admin, one for customer and one for kafka. 
we can simply write our configuration of all apps inside the docker-compose.yml file and thats it.
Install docker compose easily by these commands
``` bash
sudo mkdir -p /usr/local/lib/docker/cli-plugins

sudo curl -SL https://github.com/docker/compose/releases/download/v5.5.0/docker-compose-linux-x86_64 \
  -o /usr/local/lib/docker/cli-plugins/docker-compose

sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
docker compose version
```

![[Pasted image 20260825014157.png]]

next you can start setting up project since everything is installed in EC2 Machine


