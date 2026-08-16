# Creating DockerHub Account

:::info
DockerHub is a cloud registry where your CI/CD pipeline will automatically push the built Docker images.
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
Consequently, the Docker image name you build must be identically matched in your CI/CD pipeline configuration:
`hashcodes7/smallkart_customer:latest`

Now that our DockerHub account and repository are created, we are ready to securely connect it to GitHub. 

Follow this file: [DockerHub Connection With DockerImage](./7-Dockerhub-connection-with-dockerimage.md).