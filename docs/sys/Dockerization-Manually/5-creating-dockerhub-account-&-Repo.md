# Creating DockerHub Account & Repo

:::info
DockerHub is a cloud registry where you can safely store and share your built Docker images.
:::

## Setup Steps

1. Go to [hub.docker.com](https://hub.docker.com/).
2. Create an account, set a unique username, and choose the free plan.
3. Once logged in, click the **Create Repository** button.

![Create Repository](./images/Pasted%20image%2020260815133804.png)

After creating it, your repository dashboard will look like this:

![Repository Dashboard](./images/Pasted%20image%2020260815134031.png)

### Naming Convention
As shown, the repository namespace is `hashcodes7/smallkart_customer`.
Consequently, the Docker image name you build must be compatible:
`hashcodes7/smallkart_customer:latest`

Now that our DockerHub account and repository are ready, we can proceed to build the image.

Go to [Building Docker Image](./6-Building-Docker-Image.md).