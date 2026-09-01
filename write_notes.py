import os
import json

base_dir = r"c:\Users\Harsh\HiHarsh\Coding\Python\Recommendation System\HashLearns"

content_dict = {
    20: """---
title: "AWS Deployment Assets"
---

# AWS Deployment Assets

This folder contains assets related to AWS Deployment. In AWS deployment architecture, infrastructure as code (IaC), multi-AZ deployment, and CI/CD pipelines are essential.

![AWS Architecture](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2021/08/12/AWS-deployment.png)
""",
    21: """---
title: "AWS Fundamentals"
---

# AWS Fundamentals

AWS (Amazon Web Services) fundamentals cover the core concepts of cloud computing and the foundational infrastructure that enables AWS to provide over 200 services.

### Core Cloud Concepts
* **Cloud Computing:** On-demand delivery of IT resources.
* **Elasticity & Scalability:** Acquire and release resources to match demand.
* **Global Infrastructure:** Regions, Availability Zones (AZs), and Edge Locations.
* **Shared Responsibility Model:** Security is a shared effort.

![AWS Fundamentals](https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Cloud-Practitioner_badge.634f8a21af2e0e956ed8905a72366146ba22b74c.png)
""",
    22: """---
title: "Container Deployment"
---

# AWS Container Deployment

AWS offers a variety of services for deploying and managing containers.

### Popular Options
* **AWS App Runner:** Simplest way to deploy containerized web applications.
* **Amazon ECS:** Fully managed, highly scalable orchestration.
* **Amazon EKS:** Managed Kubernetes service.
* **AWS Fargate:** Serverless compute engine for containers.

![AWS Containers](https://d1.awsstatic.com/Developer%20Marketing/containers/AWS_Containers_Graphic_1.6ebbf44cf0c0de9b00fc33eb1f9485bf2a35368a.png)
""",
    23: """---
title: "EC2 Deployment"
---

# EC2 Deployment

Deploying an application on AWS EC2 involves provisioning a virtual server, configuring its environment, and transferring your code.

### Steps
1. **Provisioning:** Select AMI, Instance Type, Key Pair.
2. **Connecting:** SSH into your instance.
3. **Environment:** Install dependencies.
4. **Running:** Start the app (e.g., using `pm2` or `systemd`).

![EC2 Instance](https://d1.awsstatic.com/Digital-Marketing/House-Ads/EC2_Icon_1.b788a1e64906f232938f3289045b410972b22b10.png)
""",
    24: """---
title: "IAM"
---

# AWS IAM

AWS Identity and Access Management (IAM) is a foundational web service that enables you to securely control access to your AWS resources.

### Core Concepts
* **Principals:** Entities that can make requests.
* **Policies:** JSON-formatted documents that define permissions.
* **Roles:** Identities that can be assumed for temporary credentials.

![AWS IAM](https://d1.awsstatic.com/webteam/architecture-icons/q1-2023/products/AWS-Identity-Access-Management_Light.331b26da0a7a00f28dc7f6b9074a3f5a2e5512d7.png)
""",
    25: """---
title: "Managed Containers"
---

# Managed Containers on AWS

AWS offers fully managed services for running containerized applications.

### Key Services
* **Amazon Elastic Container Service (Amazon ECS):** Highly scalable, high-performance orchestration.
* **Amazon Elastic Kubernetes Service (Amazon EKS):** Managed Kubernetes on AWS.
* **AWS Fargate:** Serverless compute engine for containers.

![AWS ECS/EKS](https://d1.awsstatic.com/Developer%20Marketing/containers/AWS_Containers_Graphic_2.25992982d6b359f425cff2f085817ea2a9b3a32f.png)
""",
    26: """---
title: "VPC"
---

# Amazon Virtual Private Cloud (VPC)

Amazon VPC allows you to provision a logically isolated section of the AWS Cloud.

### Core Concepts
* **Subnets:** Public and private ranges of IP addresses.
* **Route Tables:** Determine where network traffic is directed.
* **Gateways:** Internet Gateway (IGW) and NAT Gateway.
* **Security:** Security Groups and Network Access Control Lists (NACLs).

![AWS VPC](https://d1.awsstatic.com/webteam/architecture-icons/q1-2023/products/Amazon-Virtual-Private-Cloud_Light.dc6b0e890c29ed212faec2edc7d612e4d9f67a28.png)
""",
    27: """---
title: "EC2"
---

# Amazon EC2

Amazon Elastic Compute Cloud (Amazon EC2) provides secure, resizable computing capacity in the cloud.

### Key Concepts
* **Virtual Servers (Instances):** Think of an EC2 instance as a virtual machine.
* **Elasticity:** Scale capacity up or down quickly.
* **Pay-As-You-Go:** Pay only for the computing capacity you actually use.

![AWS EC2](https://d1.awsstatic.com/webteam/architecture-icons/q1-2023/products/Amazon-EC2_Light.e78f44ff53fb8df48b6c59b207a97dcaf8e4edfb.png)
""",
    28: """---
title: "HTTPS"
---

# AWS HTTPS

To enable HTTPS for your applications on AWS, you generally use the AWS Certificate Manager (ACM).

### Using a Load Balancer
The most common way is placing instances behind a Load Balancer (ALB), which handles SSL/TLS termination.
* Request a free certificate using ACM.
* Configure an HTTPS listener on port 443.
* Redirect HTTP to HTTPS.

![AWS ACM](https://d1.awsstatic.com/webteam/architecture-icons/q1-2023/products/AWS-Certificate-Manager_Light.2a12903fc05e1dfc1db6c10b784a6c4293e5066a.png)
""",
    29: """---
title: "Production Deployment"
---

# AWS Production Deployment

Deploying to production on AWS requires stability, security, and repeatability.

### Core Pillars
1. **Infrastructure as Code (IaC):** Use CloudFormation or CDK.
2. **Automated CI/CD Pipelines:** Use CodePipeline, CodeBuild, CodeDeploy.
3. **Security:** Least privilege with IAM, Secrets Manager.
4. **Observability:** CloudWatch for logs and metrics.

![Production Deployment](https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2021/08/12/AWS-deployment.png)
""",
    30: """---
title: "S3"
---

# Amazon S3

Amazon Simple Storage Service (S3) is an object storage service designed to store and retrieve any amount of data.

### Key Concepts
* **Buckets:** Containers used to store objects.
* **Objects:** Files stored within a bucket.
* **Keys:** Unique identifier for an object within a bucket.

![Amazon S3](https://d1.awsstatic.com/webteam/architecture-icons/q1-2023/products/Amazon-Simple-Storage-Service_Light.f6041a7dc2a720dc55f3074d2b27af8519163e9b.png)
""",
    31: """---
title: "RDS"
---

# Amazon RDS

Amazon Relational Database Service (Amazon RDS) is a fully managed, distributed relational database service.

### Key Features
* Fully Managed: Automates patching, backups, and recovery.
* High Availability: Multi-AZ deployments.
* Supported Engines: Aurora, PostgreSQL, MySQL, MariaDB, Oracle, SQL Server.

![Amazon RDS](https://d1.awsstatic.com/webteam/architecture-icons/q1-2023/products/Amazon-RDS_Light.1c73a812d46e27bd3bb7fb5165c71a3962d29cb1.png)
""",
    32: """---
title: "CloudWatch"
---

# Amazon CloudWatch

Amazon CloudWatch is a monitoring and observability service provided by AWS.

### Key Features
* **Metrics:** Tracks performance data (CPU, memory, etc.).
* **Logs:** Collects and stores log files.
* **Alarms:** Sets thresholds to trigger automated actions.

![Amazon CloudWatch](https://d1.awsstatic.com/webteam/architecture-icons/q1-2023/products/Amazon-CloudWatch_Light.a54c979bf3b46cb6692bb716503b0c5cbdb0816b.png)
""",
    33: """---
title: "Database Setup Assets"
---

# AWS Database Setup Assets

This folder contains assets for Database Setup in AWS. The most common approach is using Amazon RDS.

### Steps
1. Navigate to RDS in AWS Console.
2. Click Create database.
3. Select Engine and instance type.
4. Configure VPC and Security Groups.

![Database Setup](https://d1.awsstatic.com/webteam/architecture-icons/q1-2023/products/Amazon-RDS_Light.1c73a812d46e27bd3bb7fb5165c71a3962d29cb1.png)
""",
    34: """---
title: "App Deployment on EC2 Assets"
---

# App Deployment on EC2 Assets

This folder contains assets for deploying applications to EC2.

### Deployment Options
* **Manual:** Connect via SSH, install dependencies, upload code.
* **Automated:** AWS CodeDeploy, CloudFormation, Auto Scaling Groups.
* **Alternative:** Elastic Beanstalk or App Runner.

![App Deployment](https://d1.awsstatic.com/webteam/architecture-icons/q1-2023/products/AWS-CodeDeploy_Light.2a3fb1c13bc9a27cba7bc1c90538a7981504cfc2.png)
""",
    35: """---
title: "What is a Distributed System-"
---

# What is a Distributed System?

A distributed system is a collection of independent computers (nodes) connected via a network that work together to achieve a common goal.

### Key Characteristics
* **No Central Control:** Nodes coordinate with each other.
* **Resource Sharing:** Computational resources and data can be shared.
* **Scalability:** Grow by adding more nodes (horizontal scaling).
* **Reliability:** No single point of failure.

![Distributed System](https://upload.wikimedia.org/wikipedia/commons/3/3f/Distributed-network.png)
""",
    36: """---
title: "Service Discovery"
---

# Service Discovery

Service discovery is a mechanism that enables services in a distributed system to dynamically locate and communicate with each other.

### How It Works
1. **Service Registration:** A service instance starts and notifies the registry.
2. **Health Checking:** The registry monitors health.
3. **Service Lookup:** Clients query the registry.

**Popular Tools:** HashiCorp Consul, Etcd, ZooKeeper, Netflix Eureka.

![Service Discovery](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Microservices_architecture.png/500px-Microservices_architecture.png)
""",
    37: """---
title: "Timeouts"
---

# Timeouts in Distributed Systems

Timeouts serve as an upper bound on how long a component will wait for an operation to complete, preventing stalled requests from holding resources indefinitely.

### Why They Are Essential
* Prevents resource exhaustion and cascading failures.
* Maintains responsiveness.
* Isolates faults.

**Best Practices:** Avoid hardcoding, distinguish per-attempt vs overall budgets, and beware of retry storms.

![Timeouts](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Timeout_icon.svg/200px-Timeout_icon.svg.png)
""",
    38: """---
title: "Retries"
---

# Retries in Distributed Systems

Retries handle transient faults like network hiccups or brief service overloads. 

### Best Practices for Safe Retries
1. **Backoff and Jitter:** Use exponential backoff and add randomness.
2. **Idempotency:** Ensure operations can be retried safely.
3. **Limit Retries:** Cap attempts and use retry budgets.
4. **Circuit Breakers:** Stop traffic to failing services.

![Retries](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Retry_icon.svg/200px-Retry_icon.svg.png)
""",
    39: """---
title: "Queues"
---

# Message Queues

Message queues serve as intermediaries enabling asynchronous, reliable, and decoupled communication between services.

### Key Concepts
* **Producer:** Sends a message.
* **Consumer:** Receives a message.
* **Queue:** Intermediary buffer.

### Popular Technologies
* Apache Kafka
* RabbitMQ
* AWS SQS

![Message Queue](https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Message_queue.svg/500px-Message_queue.svg.png)
"""
}

def main():
    with open(os.path.join(base_dir, 'tasks.json'), 'r', encoding='utf-8') as f:
        tasks = json.load(f)
    
    for i in range(20, 40):
        if i >= len(tasks):
            break
        path = tasks[i]
        os.makedirs(path, exist_ok=True)
        file_path = os.path.join(path, "index.mdx")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content_dict[i])
        print(f"Written index.mdx for index {i} in {path}")

if __name__ == "__main__":
    main()
