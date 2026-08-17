---
sidebar_label: "7. Logging In To DockerHub"
sidebar_position: 7
---

# 7. Logging In To DockerHub

:::info
We have created a Docker repository and we have a built Docker image on our system, but we have not securely connected the two environments yet.
:::

## Authenticating

Use this command in your terminal:

```bash
docker login
```

![Docker Login Prompt](Pasted%20image%2020260815163221.png)

Click the highlighted link in the terminal and open it in a browser where you are already logged into DockerHub. Enter the one-time code provided in the terminal.

![Device Authentication](Pasted%20image%2020260815163138.png)

Confirm and continue.

![Auth Success UI](Pasted%20image%2020260815163238.png)

![Auth Success Terminal](Pasted%20image%2020260815163305.png)

A `Login Succeeded` message means everything is configured properly! You can now securely push images into your DockerHub account's repository.

Go to [Pushing Docker Image to DockerHub](8-Pushing-docker-image-to-dockerhub.md).