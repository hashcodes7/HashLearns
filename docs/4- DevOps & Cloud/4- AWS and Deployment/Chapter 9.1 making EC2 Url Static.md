## Goal

Understand how to keep the URL stable when the EC2 public IP changes.

An EC2 instance normally receives an automatically assigned public IPv4 address.

Example:

```text
16.16.138.182
```

AWS generates a public DNS name from it:

```text
ec2-16-16-138-182.eu-north-1.compute.amazonaws.com
```

So:

```text
Public IP
   ↓
AWS public DNS hostname
```

## Important distinction

These actions normally do **not** require changing the public IP:

- Restarting Docker
- Restarting the Docker container
- Updating the Docker image
- Restarting Spring Boot
- Rebooting the operating system

But:

```text
EC2 Stop
   ↓
EC2 Start
```

can result in a different automatically assigned public IPv4 address.

Therefore the AWS-generated hostname can also change.

---

# Option 1 — Keep the EC2 instance running

For a simple test project, this is the cheapest approach.

Use:

```text
http://ec2-<public-ip>.<region>.compute.amazonaws.com:8080/swagger-ui/index.html
```

As long as the instance keeps its current public IPv4 address, the URL remains the same.

You do not need:

- Domain
- Route 53
- Load Balancer
- ECS
- Fargate

This is the recommended approach if an ugly URL is completely acceptable.

---

# Option 2 — Use an Elastic IP

If you need the public IP to remain associated with the EC2 instance across stop/start operations, AWS provides an **Elastic IP**.

Conceptually:

```text
Elastic IP
    ↓
EC2
    ↓
Docker
    ↓
Spring Boot :8080
```

Then your endpoint can remain based on the same IP:

```text
http://<elastic-ip>:8080/swagger-ui/index.html
```

## Important cost warning

Do **not** assume an Elastic IP is free.

AWS charges for public IPv4 addresses under current pricing, including Elastic IP usage in applicable situations.

Because this project is intended to stay minimal and low-cost, use an Elastic IP only if the stable address is worth the additional cost.

---

# What to use for this test project

If your only requirement is:

> "I want a URL that lets me open my backend."

Use:

```text
EC2 public DNS
       ↓
:8080
       ↓
Spring Boot
```

Example:

```text
http://ec2-16-16-138-182.eu-north-1.compute.amazonaws.com:8080/swagger-ui/index.html
```

Accept that the URL can change if you stop and start the EC2 instance.

## Final minimal architecture

```text
                    Internet
                       │
                       ▼
              EC2 Public DNS
                       │
                    :8080
                       │
                       ▼
                    Docker
                       │
                       ▼
              Spring Boot Backend
```

No Load Balancer.

No ECS.

No Fargate.

No NAT Gateway.

No Route 53.

No domain.

No Kubernetes.

For a low-traffic test backend, this is the simplest AWS architecture.
