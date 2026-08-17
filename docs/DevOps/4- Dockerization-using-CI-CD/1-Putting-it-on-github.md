---
sidebar_label: "1. Putting It On GitHub"
sidebar_position: 1
---
# 1. Putting It On GitHub

:::info
We have 2 Spring projects, so we are making 2 separate repositories, one for each microservice.
:::

## Repositories
- **Admin App**: `https://github.com/hashcodes7/smallkart_admin.git`
- **Customer App**: `https://github.com/hashcodes7/smallkart_customer.git`

## Git Initialization

First, initialize a new Git repository in your local project folder:
```bash
git init
```

Next, connect your local repository to the remote GitHub repository:
```bash
git remote add origin https://github.com/hashcodes7/smallkart_admin.git
```

Verify that the remote connection was successful:
```bash
git remote -v
```

**Expected Result**:
```text
origin  https://github.com/hashcodes7/bigkart.git (fetch)
origin  https://github.com/hashcodes7/bigkart.git (push)
```

## Committing and Pushing

Next, simply go to the left-side **Source Control** panel in VS Code and perform a commit and push. 

:::tip
If it asks to create an upstream branch, accept it!
:::

![Publish Branch](DevOps/4-%20Dockerization-using-CI-CD/images/Pasted%20image%2020260815025248.png)

Just select **OK** and create a remote branch. If authentication is requested, sign in with your GitHub credentials and your code will be pushed.