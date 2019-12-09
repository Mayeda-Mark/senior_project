CREATE TABLE Calendar (   
id serial  NOT NULL,    
Event_name varchar(225)  NOT NULL, 
Start_date varchar(20) NOT NULL,
Start_year_month varchar(20) NOT NULL,
End_date varchar(20),
Days_of_week integer ARRAY,
Start_recurring varchar(20),
End_recurring varchar(20),
group_id serial,
CONSTRAINT Calendar_pk PRIMARY KEY (id)
);

INSERT INTO Calendar (Event_name, Start_date, End_date)
VALUES ('Test', '2019-10-29' ,'2019-10-30');

INSERT INTO Calendar (Event_name, Start_date)
VALUES ('Marks Birthday', '2019-10-27');

Insert Into Calendar (Event_name, Start_date, Days_of_week, Start_recurring, End_recurring)
VALUES ('Recurring Test', '2019-10-01', '{3}', '2019-10-01', '2019-10-30');

CREATE TABLE Login (
    id serial NOT NULL,
    user_name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    token varchar(255),
    CONSTRAINT User_pk PRIMARY KEY (id)
);

CREATE TABLE Updates (   
id serial  NOT NULL,    
Title varchar(100)  NOT NULL,    
Update_text varchar(2000)  NOT NULL,   
Date VARCHAR(100) NOT NULL,
Img_path varchar(255),  
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
Img_path varchar(255) NOT NULL,   
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