---
sidebar_label: "7. Connecting DockerHub to GitHub"
sidebar_position: 7
---

# 7. Connecting DockerHub to GitHub

:::danger
Never hardcode your passwords or tokens inside your GitHub Actions pipeline files (`.yml`). They must be securely stored in GitHub Secrets!
:::

## Generating a Personal Access Token (PAT)

We need a Personal Access Token (PAT) from DockerHub along with our username to allow the pipeline to authenticate and push to the Docker repository.

1. In DockerHub, go to **Account Settings** -> **Security**.
![Account Settings](./images/Pasted%20image%2020260815134443.png)

2. Click on **New Access Token**.
![New Token](./images/Pasted%20image%2020260815134543.png)

3. Give it a descriptive name (like `github-actions-push`) and create it.
![Create Token](./images/Pasted%20image%2020260815134615.png)

This will generate a secure Docker repository token that looks something like this:
![Generated Token](./images/Pasted%20image%2020260815155751.png)

## Configuring GitHub Secrets

Now, take this token and put it in GitHub Secrets so your pipeline can securely inject it during the build process.

1. Go to your GitHub repository -> **Settings** -> **Secrets and variables** -> **Actions**.
![GitHub Settings](./images/Pasted%20image%2020260815134954.png)

2. Click on **New repository secret**.
![New Secret Button](./images/Pasted%20image%2020260815135247.png)

3. Create the following two secrets identically as shown:
![Create Secret Name](./images/Pasted%20image%2020260815135340.png)
![Create Secret Value](./images/Pasted%20image%2020260815135429.png)

### Required Secrets Table

| Secret Key             | Value                           |
| ---------------------- | ------------------------------- |
| `DOCKERHUB_USERNAME`   | `hashcodes7` (Your Username)    |
| `DOCKERHUB_TOKEN`      | Your DockerHub PAT              |

Next time you push code to GitHub, your CI/CD pipeline will utilize these secrets to authenticate. 

Once your CI/CD pipeline finishes processing, you will get an automatically built and pushed image appearing right in DockerHub like this!
![Pipeline Success](./images/Pasted%20image%2020260815135902.png)