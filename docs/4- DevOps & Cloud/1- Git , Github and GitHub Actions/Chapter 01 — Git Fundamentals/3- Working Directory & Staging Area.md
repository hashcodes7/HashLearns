

# Working Directory & Staging Area

Git does not immediately consider every change in your project and sends it to the online git repo, you must mark the files you want to send online and then they will be added to Staging area. After that, you can commit it so that all the changes go over on the other side.

	Local Git Repository 
		│
		│    git add
		│
		▼ 
	Staging Area 
		│
		│    git commit
		│
		▼ 
	Online Git Repository

A nice intuition is that in a hospital (local repo) many people (code files) are being worked on. once they are healthy you and you are ready to send them off you send them (git add) to taxi station (staging area), from where they are ready to go.
and once you are totally determined they should go, you call a texi and actually send them off (git commit)

## Code 
``` bash
git add .
git commit -m "Add user authentication"
```
