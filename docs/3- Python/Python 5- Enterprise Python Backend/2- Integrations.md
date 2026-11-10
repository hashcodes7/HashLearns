## making CICD pipeline and Connecting Github
#### <span style="color:#2f9e44">1- Creating Docker Account</span>
- Sign in to your Docker Hub account.
- Note your Docker Hub username.
- Go to Account Settings → Personal access tokens.
- Generate a new access token.
- Give it Read & Write permissions.
- Copy the token immediately and store it securely.
Visit this article to create a docker account : https://hashlearns.pages.dev/docs/DevOps%20&%20Cloud/Docker/Dockerization-using-CI-CD/creating-dockerhub-account

#### <span style="color:#2f9e44">2- Setting DockerHub Token</span>  
Settings → Secrets and variables → Actions → add both secrets here as DOCKERHUB_USERNAME and DOCKERHUB_TOKEN
Visit this article to create a docker account : https://hashlearns.pages.dev/docs/DevOps%20&%20Cloud/Docker/Dockerization-using-CI-CD/Dockerhub-connection-with-dockerimage


#### <span style="color:#2f9e44">3- Creating CICD Pipeline </span>
We will be creating 2 CICD pipelines : 1 to dockerize the application and 2- to Put the docker image on AWS EC2 Machine
##### Dockerization Pipeline (from github code -> Docker Image on DockerHub) : 
check https://github.com/hashcodes7/Google_ADK_Business_ops/blob/main/.github/workflows/build.yml

If all well and done you should find your docker like this 
![643](assets/Pasted%20image%2020261110012650.png)


## Deployment

To deploy using CICD we need to procure 4 secret variables and add them to the repository secrets  

| Secret Name             | What it is              | Example Value                              | Where to find it                |
| ----------------------- | ----------------------- | ------------------------------------------ | ------------------------------- |
| `AWS_ACCESS_KEY_ID`     | IAM User Access Key     | `AKIAIOSFODNN7EXAMPLE`                     | Generated in AWS IAM            |
| `AWS_SECRET_ACCESS_KEY` | IAM User Secret Key     | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` | Generated in AWS IAM            |
| `AWS_REGION`            | AWS Region of your EC2  | `us-east-1` or `ap-south-1`                | Top-right corner of AWS Console |
| `EC2_INSTANCE_ID`       | ID of your EC2 instance | `i-0123456789abcdef0`                      | EC2 Console → Instances table   |

