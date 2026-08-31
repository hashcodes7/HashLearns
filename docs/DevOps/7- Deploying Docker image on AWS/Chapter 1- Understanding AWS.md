
AWS isnt like google drive or something you have already used, here anything happens only if someone does it. 

you can think of it like if a person is murdered, there has to be a killer. a human, machine, or software.

> **Every AWS action needs an identity that is allowed to perform that action.**

so when you make a RDS for example-
```
You
 ↓
IAM Identity
 ↓
"Create RDS"
 ↓
AWS checks permission (if you are allowed to make a RDS or not)
 ↓
RDS created
```

> **This applies even when AWS itself is doing something

eg. you Created a RDS and enabled monitoring for database health. but is your AWS allowed to monitor the RDS? for this AWS will make a identity while asking RDS its health.
```
RDS
 ↓
AWSServiceRoleForRDS
 ↓
AWS operation
```

>**This applies even when 2 different services are connecting. 

Lets say your EC2 machine wants the RDS deleted. but is it allowed to do that? if a role is attached to the EC2 machine which lets it do things to RDS then only it can.
```
EC2
 ↓
IAM Role
 ↓
RDS
```

![](assets/Pasted%20image%2020260818030909.png)