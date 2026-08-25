---
sidebar_label: "3. Creating Dockerfile"
sidebar_position: 3
---

# 3. Creating Dockerfile

:::info
Even though the build process is fully automated via CI/CD, GitHub Actions still requires a `Dockerfile` in the root of the repository to understand how to construct the image.
:::

## Creating the File

Create the file quickly using the `touch` command inside your project:
```bash
touch Dockerfile
```

![Dockerfile Creation](./images/Pasted%20image%2020260815120337.png)

Once done, you will see a `Dockerfile` built right in your project sidebar.

## Dockerfile Configuration

Open that empty file and paste the following configuration:

```dockerfile
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY target/bigkart-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

Save and close this file. Ensure it gets committed to the repository so the pipeline can access it!

:::tip
To deeply understand what each line in this file does, check this optional reference: [Understanding DockerFile Commands](3.1-Optional-Understanding-DockerFile-Commands-1.md).
:::