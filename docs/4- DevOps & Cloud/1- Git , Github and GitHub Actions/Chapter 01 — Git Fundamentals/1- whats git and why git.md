
## Why Git - Version Control and Code Collaboration

Git is a **distributed version control system (VCS)** used to track changes in source code and coordinate work between developers.

It solves two separate problems:

1. **Version Control** → keeping track of how code changes over time.
2. **Code Collaboration** → allowing multiple developers to work on the same codebase safely.
3. Code Storage → We need a place to store our code which isnt our pc and somewhere remote and secure

## Git Repository
A Git repository is nothing but your regular folder only, but along with your code files in that folder, we are also storing another file called .git in this folder which contains versions, metadata and history, allowing so that over the time whenever the code file changes, our .git file can store a history about those changes.
![](assets/Pasted%20image%2020260902125004.png)

now that you know whats a git repo, there are 2 types of repo (based on where your code folder is present thats all)
- Local Repo
- Remote Repo (online)

Simply, you make changes in your local Repo, and then when you are confident and want to take backup, you replace your cloud repo with your local one. 
- next person can simply take changes from online and start continuing the work

Many platforms help you to make git repo online, eg. GitHub ,GitLab, Azure Devops etc. we will be continuing with Github going forward.