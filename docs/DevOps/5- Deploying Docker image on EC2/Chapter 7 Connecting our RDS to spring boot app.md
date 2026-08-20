![[Pasted image 20260820151654.png]]

![[Pasted image 20260820151812.png]]

so based on this connection to our RDS can be made by 
ip address: port number
mysql://bigkart-db-server.c9cuu68as97f.ap-south-1.rds.amazonaws.com:3306

in addition we also add database name in end to specify which database in case of multiple databases
mysql://bigkart-db-server.c9cuu68as97f.ap-south-1.rds.amazonaws.com:3306/Bigkart_admin_db
so mofify this in your application.properties file to connect to database in following format

``` python
spring.application.name=bigkart-admin

spring.datasource.url=jdbc:mysql://bigkart-db-server.c9cuu68as97f.ap-south-1.rds.amazonaws.com:3306/Bigkart_admin_db
spring.datasource.username=admin
spring.datasource.password=YOUR_RDS_PASSWORD

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

