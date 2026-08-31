---

---

---

You made a VPC , great now your apps have a address and things can reach to it.
but who should reach and who should be blocked? Thats what a security group does.
Its like a security guard in front of your house which determines whom to let entry and whom to stop.
## Lets understand it by a story
Once upon a time there was a database or app who needed to live somewhere
![](assets/Pasted%20image%2020260826012516.png)

AWS Service was there (eg a RDS Server for a database or EC2 for a app) and it could keep it
![](assets/Pasted%20image%2020260826013020.png)

and it started living inside it.
but sometime later our app started feeling lonely and wanted to connect with others but he had no address of his house
![](assets/Pasted%20image%2020260826014603.png)

![](assets/Pasted%20image%2020260826015811.png)


![](assets/Pasted%20image%2020260826020823.png)
#### BUT... little did our little sarvu's database knew, there was a evil monster nearby!!!!

![](assets/Pasted%20image%2020260826020309.png)

![](assets/Pasted%20image%2020260826020959.png)

![](assets/Pasted%20image%2020260826021825.png)

Now our Mr.Security Group had security rules in hand and knew whom to stop and whom to allow

![](assets/Pasted%20image%2020260826022224.png)

That concludes the story.
our app lives inside a aws service
VPC is someone who gave us a address for our aws service
Security Group allows/denies connecting to the app
it does this based on security Rules
(in our case our security group has rule to allow everybody coz fuck complexity.)
