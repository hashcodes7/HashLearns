Once upon a time there were 3 friends who started a pizza shop
![](assets/Pasted%20image%2020260827025648.png)

The roles got distributed and each of them had one job
![](assets/Pasted%20image%2020260827030251.png)

![](assets/Pasted%20image%2020260827030937.png)

their shop starts running but sometime later...
![](assets/Pasted%20image%2020260827031509.png)

they were facing 3 issues 
- failed orders were not getting processed because orders were too many
- every app had different time to do work, writing order was 2 minute job but making pizza takes 10 mintes
- everyone wasnt working on same page and too dependent on each other (coupling and synchronous problem)

![](assets/Pasted%20image%2020260827032051.png)

So they decided to hire a middle man friend whose name was kafka, who will go around telling everyone what they should do next. prepare what order, bill which order, and now everyone has to communicate only with kafka.
![](assets/Pasted%20image%2020260827032449.png)

now whenever a order came..
![](assets/Pasted%20image%2020260827033001.png)

![](assets/Pasted%20image%2020260827033352.png)

with kafka's logbook now no order was pending also and their pizza selling business started working~ 

(they sell on local roadside, remember that. and are not yet deployed in a shop which can host them)

-The End-
