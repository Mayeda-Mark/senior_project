CREATE TABLE Calendar (   
id serial  NOT NULL,    
Event_name varchar(100)  NOT NULL, 
Week_long boolean NOT NULL,
Year int NOT NULL,  
Month varchar(10) NOT NULL,  
Day int NOT NULL,  
CONSTRAINT Calendar_pk PRIMARY KEY (id)
);

CREATE TABLE Updates (   
id serial  NOT NULL,    
Title varchar(100)  NOT NULL,    
Date DATE NOT NULL,
Update_text varchar(2000)  NOT NULL,   
CONSTRAINT Updates_pk PRIMARY KEY (id)
);

INSERT INTO Updates (title, update_text)
VALUES ('Test1', 'Here is some test text');

INSERT INTO Updates (title, update_text)
VALUES ('Test2', 'Here is some longer test text. My tummy feels all gurgely and my butt really stinks');

CREATE TABLE Stock (   
id SERIAL NOT NULL,    
Product_name varchar(100)  NOT NULL,    
Description varchar(2000)  NOT NULL,    
Price money  NOT NULL,    
Inventory int  NOT NULL,  
CONSTRAINT Stock_pk PRIMARY KEY (id)
); 
INSERT INTO Stock(
    product_name,
    description,
    price,
    inventory
)
VALUES(
    'Pecan Cutie Pies',
    'The best ones',
    2.75,
    12
);
INSERT INTO Stock (
    product_name,
    description,
    price,
    inventory
)
VALUES(
    'Apple Cutie Pies',
    'Little apple pies',
    2.50,
    10
);