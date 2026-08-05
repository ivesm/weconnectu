### Weconnect MYSQL Scripts
DROP DATABASE IF EXISTS weconnectudb;

## Create  Database 

CREATE DATABASE IF NOT EXISTS weconnectudb ;

USE weconnectudb;

## Creating a table 
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL DEFAULT '',
  email varchar(100) NOT NULL DEFAULT '',
  phonenumber varchar(100) DEFAULT NULL ,
  message varchar(100) NOT NULL DEFAULT '',

  PRIMARY KEY (id),
  INDEX index_name (name),
  INDEX index_phone (phonenumber),
  UNIQUE INDEX unique_index_email (email),
  UNIQUE INDEX unique_index_name (name)
) ;

# Inserting a record

insert into users  (name,email,phonenumber ,message)values ('Name_1','test_1@test.co.za', '0821231001','testmessage1') ;
insert into users  (name,email,phonenumber ,message)values ('Name_2','test_2@test.co.za', '0821231002','testmessage2') ;
insert into users  (name,email,phonenumber ,message)values ('Name_3','test_3@test.co.za', '0821231003','testmessage3') ;
insert into users  (name,email,phonenumber ,message)values ('Name_4','test_4@test.co.za', '0821231004','testmessage4') ;
insert into users  (name,email,phonenumber ,message)values ('Name_5','test_5@test.co.za', '0821231005','testmessage5') ;
insert into users  (name,email,phonenumber ,message)values ('Name_6','test_6@test.co.za', '0821231006','testmessage6') ;

