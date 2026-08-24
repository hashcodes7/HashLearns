# Step 2 — Deploy the Docker Image on EC2

## Goal

Take your existing Docker image and run it inside the EC2 instance.

Target:

```text
Internet
   ↓
EC2
   ↓
Docker
   ↓
Spring Boot container :8080
```

## 1. Connect to EC2
open cmd of instance
![[Pasted image 20260824214619.png]]
## 2. Install Docker

On Amazon Linux 2023:

```bash
sudo dnf update -y
sudo dnf install -y docker
```
![[Pasted image 20260824214841.png]]
### Start Docker:

```bash
sudo systemctl start docker
```
![[Pasted image 20260824215541.png]]
Enable Docker on boot:

```bash
sudo systemctl enable docker
```
![[Pasted image 20260824215554.png]]
Allow the current user to run Docker:

```bash
sudo usermod -aG docker ec2-user
```
![[Pasted image 20260824215533.png]]
Log out and SSH back in so the group change takes effect.

Check:

```bash
docker --version
```
![[Pasted image 20260824215528.png]]
## 3. Get your Docker image

If your image is on Docker Hub:

```bash
docker pull <dockerhub-username>/<image-name>:<tag>
```

Example:

```bash
docker pull hashcodes7/smallkart-customer:latest
```

![[Pasted image 20260824215447.png]]

Check:

```bash
docker images
```
![[Pasted image 20260824215702.png]]
## 4. Run the container

If your Spring Boot application listens on port `8080` inside the container:

```bash
docker run -d   --name BigKartDeployedCustomer   -p 8080:8080   sarwvidya/bigkart_customer:latest
```
![[Pasted image 20260824220312.png]]

The mapping means:

```text
EC2 port 8080
      ↓
container port 8080
```

## 5. Check the container

```bash
docker ps
```

You should see something similar to:

```text
CONTAINER ID   IMAGE                              PORTS
xxxxxxx        hashcodes7/smallkart-customer     0.0.0.0:8080->8080/tcp
```

## 6. Check application logs

```bash
docker logs backend
```

For live logs:

```bash
docker logs -f backend
```

Wait until Spring Boot reports that it has started.

## 7. Test from your browser

Use:

```text
http://<EC2-PUBLIC-DNS>:8080/
```

For Swagger, commonly:

```text
http://<EC2-PUBLIC-DNS>:8080/swagger-ui/index.html
```

The exact path depends on your Spring Boot / Swagger configuration.

## 8. If it does not open

Check the container:

```bash
docker ps
```

Check logs:

```bash
docker logs backend
```

Check that the application is listening on `0.0.0.0` inside the container rather than only `localhost`.

Also verify the EC2 Security Group has:

```text
TCP 8080
Source: 0.0.0.0/0
```

## Final result

You now have:

```text
http://ec2-<public-ip>.<region>.compute.amazonaws.com:8080
```

Your Dockerized backend is live.

However, the public IP can change if the EC2 instance is **stopped and started**.

Step 3 addresses that issue.
