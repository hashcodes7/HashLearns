![](assets/Pasted%20image%2020260820151654.png)

![](assets/Pasted%20image%2020260820151812.png)

#### So based on this, connection to our RDS can be made in this format
format ---->>    ip address   : port number  /   database_name

mysql://bigkart-db-server.c9cuu68as97f.ap-south-1.rds.amazonaws.com:3306/bigkart_admin_db

- so modify this in your application. Properties file (at \src\main\resources\application.properties) 
to connect to database in following format

``` python
spring.application.name=bigkart-admin

spring.datasource.url=jdbc:mysql://bigkart-db-server.c9cuu68as97f.ap-south-1.rds.amazonaws.com:3306/bigkart_admin_db
spring.datasource.username=admin
spring.datasource.password=YOUR_RDS_PASSWORD

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Once this is done, your database is now created and now is connected also, to the spring boot app.