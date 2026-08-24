# Step 1 — Get a Bare-Minimum EC2

## Goal

Create the smallest practical EC2 setup for a test backend, without adding ECS, Load Balancer, NAT Gateway, or other unnecessary infrastructure.

> **Target architecture**
>
> `Internet → EC2 → Docker → Spring Boot :8080`

## 1. Open EC2

AWS Console → **EC2** → **Instances** → **Launch instances**

## 2. Instance name

Use any name, for example:

`backend-test`

## 3. Choose an AMI

Use:

**Amazon Linux 2023**

## 4. Choose an instance type

Choose an instance type that is currently eligible for your AWS Free Tier / Free plan.

For a tiny test backend, use the smallest suitable eligible instance shown by the console.

> **Important:** AWS Free Tier eligibility and limits can change. Verify the **Free tier eligible** label and the pricing/free-tier information shown in your account before launching.

## 5. Key pair

Select **Proceed without a key pair (Not recommended)**.

We will use **EC2 Instance Connect** to access the instance directly from the AWS Console, so a key pair `.pem` file is not needed for this setup.

## 6. Network settings

For a simple test backend, allow:

### SSH

```text
Type: SSH
Port: 22
Source: Anywhere (or EC2 Instance Connect IP range)
```

This allows you to connect via EC2 Instance Connect directly from the AWS Console.

### Backend

Add:

```text
Type: Custom TCP
Port: 8080
Source: 0.0.0.0/0
```

This makes your Spring Boot API reachable from the internet.

> For a real production application, do not blindly expose application ports like this. This is intentionally minimal for a test project.

## 7. Storage

Use the smallest practical root volume offered by the selected free-tier-eligible configuration.

Do not add extra EBS volumes.

## 8. Launch

Click:

**Launch instance**

Wait until:

```text
Instance state: Running
Status checks: 2/2 checks passed
```

## 9. Find the public address

Open the instance details and find:

**Public IPv4 address**

and/or:

**Public IPv4 DNS**

You may see something similar to:

```text
ec2-16-16-138-182.eu-north-1.compute.amazonaws.com
```

At this point you have:

```text
Internet
   ↓
EC2
   ↓
Public IPv4 / AWS public DNS
```

The backend is not deployed yet.

That is Step 2.

## Important cost rule

For this test setup, avoid creating resources you do not need:

- Application Load Balancer
- Network Load Balancer
- NAT Gateway
- ECS cluster
- Fargate service
- Extra EC2 instances
- Extra EBS volumes
- Elastic IP unless you specifically need one

The goal is simply:

**one EC2 instance + its required networking resources.**

## 10. Enable AWS Systems Manager (SSM) Session Manager (Optional but recommended)

If you prefer to connect to your instance using **Session Manager** (which is more secure and does not require opening SSH port 22), you need to attach an IAM role to the EC2 instance.

### Create the IAM Role:
1. Open the **IAM Console** → **Roles** → **Create role**.
2. Select **AWS service** as the trusted entity and choose **EC2** as the use case. Click **Next**.
3. Search for and attach the policy: `AmazonSSMManagedInstanceCore`. Click **Next**.
4. Name the role (e.g., `EC2-SSM-Role`) and click **Create role**.

### Attach Role to EC2:
1. Go back to the **EC2 Console** → **Instances**.
2. Select your `backend-test` instance.
3. Click **Actions** → **Security** → **Modify IAM role**.
4. Select the `EC2-SSM-Role` you just created and click **Update IAM role**.

Once attached, you can select the instance and click **Connect** → **Session Manager** to open a secure terminal directly from your browser.
