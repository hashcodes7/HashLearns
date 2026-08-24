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

From your local machine:

```bash
ssh -i "your-key.pem" ec2-user@<EC2-PUBLIC-DNS>
```

Example:

```bash
ssh -i "backend-test-key.pem" ec2-user@ec2-16-16-138-182.eu-north-1.compute.amazonaws.com
```

## 2. Install Docker

On Amazon Linux 2023:

```bash
sudo dnf update -y
sudo dnf install -y docker
```

Start Docker:

```bash
sudo systemctl start docker
```

Enable Docker on boot:

```bash
sudo systemctl enable docker
```

Allow the current user to run Docker:

```bash
sudo usermod -aG docker ec2-user
```

Log out and SSH back in so the group change takes effect.

Check:

```bash
docker --version
```

## 3. Get your Docker image

If your image is on Docker Hub:

```bash
docker pull <dockerhub-username>/<image-name>:<tag>
```

Example:

```bash
docker pull hashcodes7/smallkart-customer:latest
```

Check:

```bash
docker images
```

## 4. Run the container

If your Spring Boot application listens on port `8080` inside the container:

```bash
docker run -d   --name backend   -p 8080:8080   <dockerhub-username>/<image-name>:<tag>
```

Example:

```bash
docker run -d   --name backend   -p 8080:8080   hashcodes7/smallkart-customer:latest
```

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
