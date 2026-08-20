
Simply, Role and User define a identity of whoever is using aws/aws service.
Their permissions are provided by policy or a policy group

eg. harsh wants to be member of developer group so harsh will make a IAM user on his name, attach himself into the group has all policy related to a developer (someone made this earlier) and he will have all the permissions from all policies from this group
this group contains multiple policies each define which services harsh can read/write/delete/run etc.

so in order to give someone permission you can give them a policy
or
put them in a policy group which gives them a bunch of policy permissions all at once.
