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