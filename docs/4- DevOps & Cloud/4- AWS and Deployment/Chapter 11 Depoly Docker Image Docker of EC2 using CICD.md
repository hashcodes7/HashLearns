To deploy using CICD we need to procure 4 secret variables and add them to the repository secrets  

| Secret Name             | What it is              | Example Value                              | Where to find it                |
| ----------------------- | ----------------------- | ------------------------------------------ | ------------------------------- |
| `AWS_ACCESS_KEY_ID`     | IAM User Access Key     | `AKIAIOSFODNN7EXAMPLE`                     | Generated in AWS IAM            |
| `AWS_SECRET_ACCESS_KEY` | IAM User Secret Key     | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` | Generated in AWS IAM            |
| `AWS_REGION`            | AWS Region of your EC2  | `us-east-1` or `ap-south-1`                | Top-right corner of AWS Console |
| `EC2_INSTANCE_ID`       | ID of your EC2 instance | `i-0123456789abcdef0`                      | EC2 Console → Instances table   |

Go to IAM -> Users

![](assets/Pasted%20image%2020261110014019.png)

- Create a new User `github-actions-deployer`
#### <span style="color:#2f9e44">Now we have to attach a policy to this new User</span>
Attach the policies like this ->
- go to left bar and select policies
- Click **Create policy** (opens in a new tab) 
- click the **JSON** tab and paste this minimum-privilege policy:

``` json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ssm:SendCommand",
                "ssm:GetCommandInvocation",
                "ssm:ListCommandInvocations"
            ],
            "Resource": "*"
        }
    ]
}
```

- Enter a name of your policy eg. `GitHubActionsSSMDeployPolicy` and click create
- Basically now you have a user and a policy, attach the policy to the user thats it.

#### 2. Creating access keys of this user
![586](assets/Pasted%20image%2020261110164754.png)
- Click on the newly created user: `github-actions-deployer`.
- Go to the **Security credentials** tab.
- Scroll down to **Access keys** and click **Create access key**.
- Select **Application running outside AWS** → Click **Next** → **Create access key**.
- Copy both:
    - **Access key** ➔ Put into GitHub Secret: `AWS_ACCESS_KEY_ID`
    - **Secret access key** ➔ Put into GitHub Secret: `AWS_SECRET_ACCESS_KEY`

![673](assets/Pasted%20image%2020261110164919.png)

This marks getting item 1,2 of your CICD pipeline. 

Next Region and instance ID.

get instance ID and region from EC2-> instances  here it is `i-0fb437147e15b2941` as the instance ID and ap-south-1b as the region
![](assets/Pasted%20image%2020261110165157.png)


Add all these 4 information into the repository secrets in github as these names

| Secret Name             |
| ----------------------- |
| `AWS_ACCESS_KEY_ID`     |
| `AWS_SECRET_ACCESS_KEY` |
| `AWS_REGION`            |
| `EC2_INSTANCE_ID`       |
and run your deployment pipeline with additional info to fetch from dockerhub 

# Sample codes
## Deployment Pipeline
```python
name: 2. Deploy to EC2 via SSM

on:
  workflow_run:
    workflows: [ "1. Test & Build Docker Image" ]
    types:
      - completed
  workflow_dispatch:

jobs:
  deploy-to-ec2-ssm:
    name: Deploy to EC2 via AWS Session Manager (Docker Compose)
    runs-on: ubuntu-latest
    if: ${{ github.event_name == 'workflow_dispatch' || github.event.workflow_run.conclusion == 'success' }}

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION || 'us-east-1' }}

      - name: Execute Deployment Commands via SSM Run Command
        run: |
          echo "🚀 Deploying to EC2 via AWS SSM Run Command..."

          INSTANCE_ID=$(echo "${{ secrets.EC2_INSTANCE_ID }}" | tr -d '[:space:]')
          REGION=$(echo "${{ secrets.AWS_REGION || 'us-east-1' }}" | tr -d '[:space:]')
          DOCKERHUB_USER=$(echo "${{ secrets.DOCKERHUB_USERNAME }}" | tr -d '[:space:]')

          echo "Target Instance ID: [$INSTANCE_ID]"
          echo "Target Region:      [$REGION]"

          # Read local deployment script and encode as base64 to avoid all YAML escaping issues
          SCRIPT_B64=$(base64 -w 0 scripts/deploy_remote.sh)
          COMPOSE_B64=$(base64 -w 0 docker-compose.yml)

          # Prepare SSM commands array using jq cleanly
          SSM_PARAMS=$(jq -n \
            --arg s_b64 "$SCRIPT_B64" \
            --arg c_b64 "$COMPOSE_B64" \
            --arg user "$DOCKERHUB_USER" \
            '{"commands": [
              "mkdir -p /home/ssm-user/apps/gadk-backend",
              "echo \"" + $c_b64 + "\" | base64 -d > /home/ssm-user/apps/gadk-backend/docker-compose.yml",
              "echo \"" + $s_b64 + "\" | base64 -d > /tmp/deploy_remote.sh",
              "chmod +x /tmp/deploy_remote.sh",
              "/tmp/deploy_remote.sh \"" + $user + "\""
            ]}')

          # Send the command via AWS SSM Run Command
          COMMAND_ID=$(aws ssm send-command \
            --region "$REGION" \
            --instance-ids "$INSTANCE_ID" \
            --document-name "AWS-RunShellScript" \
            --comment "Deploy gadk-backend via Docker Compose" \
            --parameters "$SSM_PARAMS" \
            --output text \
            --query "Command.CommandId")

          echo "SSM Command ID: $COMMAND_ID"
          echo "Waiting for deployment to complete..."

          aws ssm wait command-executed \
            --region "$REGION" \
            --command-id "$COMMAND_ID" \
            --instance-id "$INSTANCE_ID" || true

          STATUS=$(aws ssm get-command-invocation \
            --region "$REGION" \
            --command-id "$COMMAND_ID" \
            --instance-id "$INSTANCE_ID" \
            --query "Status" \
            --output text)

          echo "Deployment Status: $STATUS"

          echo "--- STDOUT ---"
          aws ssm get-command-invocation \
            --region "$REGION" \
            --command-id "$COMMAND_ID" \
            --instance-id "$INSTANCE_ID" \
            --query "StandardOutputContent" \
            --output text

          echo "--- STDERR ---"
          aws ssm get-command-invocation \
            --region "$REGION" \
            --command-id "$COMMAND_ID" \
            --instance-id "$INSTANCE_ID" \
            --query "StandardErrorContent" \
            --output text

          if [ "$STATUS" != "Success" ]; then
            exit 1
          fi
```