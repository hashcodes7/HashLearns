Since I understand Session Manager, Do this
#### **1. Attach the SSM Role to your EC2 Instance** (one time setup for new EC2)

EC2 needs the standard AWS SSM managed policy to communicate with Session Manager:

1. Go to **AWS Console** → **IAM** → **Roles** → **Create role**.
2. Select **AWS Service** → **EC2**.
3. Attach policy: **`AmazonSSMManagedInstanceCore`**.
4. Name it `EC2-SSM-SessionManager-Role` and save.
5. Go to **EC2** → select your instance → **Actions** → **Security** → **Modify IAM role** → attach `EC2-SSM-SessionManager-Role`.

<span style="color:#2f9e44">result</span> -> you can now use EC2 using session manager

#### 2. Connect to instance and run checks
1- run `whoami` , expected output is `ssm-user`
2- run `echo $HOME` expected output is `/home/ssm-user`

#### 3. Install and run docker
1- run `sudo dnf update -y` to update linux
2- run `sudo dnf install docker -y
3- run `docker --version` to see if it installed well
3- run `sudo systemctl start docker` to start docker right now
#### 4. Enable docker on boot
1- run `sudo systemctl enable docker` enables docker to start everytime on boot

#### 5. Install docker compose 
1- use `sudo dnf install docker-compose-plugin -y` to install docker compose. if not available, use this 
``` bash
sudo mkdir -p /usr/local/lib/docker/cli-plugins

sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
-o /usr/local/lib/docker/cli-plugins/docker-compose

sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
```

2- verify docker compose using `docker compose version`
it should return a result like `docker compose version v5.7.0`

#### 6. Add `ssm-user` to the Docker group
1- use `sudo usermod -aG docker ssm-user` to add the user to docker group

## Structure of EC2 Filesystem for multi app scaling

``` bash
/home/ssm-user/
│
└── apps/
    │
    ├── gadk-backend/
    │   ├── docker-compose.yml
    │   ├── .env.prod
    │   └── deployment/
    │
    ├── app-2/
    │   ├── docker-compose.yml
    │   ├── .env.prod
    │   └── deployment/
    │
    └── app-3/
        ├── docker-compose.yml
        ├── .env.prod
        └── deployment/
```

our current app will be gadk-backend

#### 7. Make directory for the project  
(replace file name with yours)  
``` bash
mkdir -p ~/apps/gadk-backend/deployment
cd ~/apps/gadk-backend
```

#### 8.  Create docker compose file and .env.prod file
``` bash
touch docker-compose.yml
touch .env.prod
```

#### 9. Write Docker compose and environment variables  
  
1- use `nano docker-compose.yml` to edit this file and use below template to fill the compose info  
``` yml
version: '3.8'
services:
  backend:
    image: <your-dockerhub-username>/business-ops-backend:latest
    container_name: gadk-backend
    restart: unless-stopped
    ports:
      - "8000:8000"
    env_file:
      - .env.prod
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/v1/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
```

2- use `nano .env.prod` to write the environment files permissions
``` python
APP_ENV=prod
APP_NAME=Business Operations Dashboard
APP_VERSION=1.0.0
DEBUG=false
API_V1_PREFIX=/api/v1
ECOMMERCE_API_URL=https://fakestoreapi.com
GOOGLE_API_KEY=<your_key>
GOOGLE_GENAI_USE_VERTEXAI=false
LOG_LEVEL=INFO
```

#### 9. Set .env file permissions to read only for normal users
``` bash
chmod 600 .env.prod
```

## Conclusion
Now we can manage our app's docker compose using 
``` bash
docker compose -p gadk-backend up -d
```

and for other app (lets say app-2)
``` bash
docker compose -p app-2 up -d
```

