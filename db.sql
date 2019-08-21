CREATE TABLE Stock (   
id serial  NOT NULL,    
Product_name varchar(100)  NOT NULL,    
Dscription varchar(2000)  NOT NULL,    
Price float(3, 2)  NOT NULL,    
Inventory int  NOT NULL,  
CONSTRAINT Stock_pk PRIMARY KEY (id)
);