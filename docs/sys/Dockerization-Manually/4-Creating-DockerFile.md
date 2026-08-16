# Creating Dockerfile

:::info
A `Dockerfile` is a script that contains a collection of instructions for building your Docker image. It specifies the base OS, Java runtime, and how to execute your application.
:::

## Creating the File

Create the file quickly using the `touch` command inside your Codespaces terminal:
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

Save and close this file.

:::tip
To check what each command does, refer to [Understanding DockerFile Commands](./4.1-Optional-Understanding-DockerFile-Commands.md).
:::

Now proceed to [Creating DockerHub Account & Repo](./5-creating-dockerhub-account-&-Repo.md).