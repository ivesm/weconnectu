## The brief: WeConnect U  Technical Assessment 

- Build a form that captures name, email, valid South African phone number and a message.
- The data must be securely saved into a SQL database.
- Every field is required and needs to be validated.
- There should also be a page that lists the saved entries.
- The pages need to look good, work well and have the appropriate user feedback (negative and positive) in a presentable, production-ready way.
- The only language requirement is that it must be written in PHP (without the use of a framework).
- The front-end can use whichever css/javascript framework you prefer.
- Please also provide a SQL file with some dummy data to test with.

## Assumptions and Recomentastions
- a Windows environment 
- an appropriate environment has been setup to run the code 
    - Something like XAMMP works well to create a test Environment
    - XAMMP Installs php as well
    - XAMMP  aslo installs phpAdmin that administers  the Mysql databases, a tool like HeidiSQL is also usefull 
      or  Mysql Workbench 
- php is installed  ( https://www.php.net/manual/en/install.php )
- mysql server is installed (https://dev.mysql.com/downloads/installer/ )
- node.js is installed  ( https://nodejs.org/en/download )
- You know what the root user name and password are for your Mysql Server 

##  Lets Assume you HAVE XAMMP and Windows
- We can now Setup a local  DNS server routing
- locate the  httpd-vhosts.conf  file (C:\xampp\apache\conf\extra\httpd-vhosts.conf)
    add the below to 

    <VirtualHost *:80>
        ServerName weconnectu.local_php
        DocumentRoot "C:\xampp\htdocs\weconnectu\weconnectu_php"
        <Directory "C:\xampp\htdocs\weconnectu\weconnectu_php">
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>
    </VirtualHost>

    <VirtualHost *:80>
        ServerName weconnectu.local_react
        DocumentRoot "C:\xampp\htdocs\weconnectu\weconnectu_react\dist"
        <Directory "C:\xampp\htdocs\weconnectu\weconnectu_react\dist">
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>
    </VirtualHost>

-  locate  the hosts file (C:\Windows\System32\drivers\etc\hosts), you will need to open this file as an Administrator
    add the below 
    
    127.0.0.1 weconnectu.local_react
    127.0.0.1 weconnectu.local_php

- also make sure  to restart  the Apache Server , 
- you  need to take note of the server names that  you use as this will be used in the configs  of the php and react projects

## SHOULD  YOU  HAVE  Linux
- you Need to Install apache web server 
- you Will then need to find the   httpd-vhosts.conf and host files, and then you can add  the same info as above.   

## Database Setup 
Once you  have Mysql installed and the Server is running,  you can run the following Command 
- mysql -u root -p < weconnect.sql
- You can also  use tools like HeidiSQL(https://www.heidisql.com/download.php) or Mysql WorkBench(https://dev.mysql.com/downloads/workbench/)  to Run the weconnect.sql file
- it is important to take note of the username (u) and password (p) you used to setup the Mysql Server

## BackEnd PHP system Setup 
In the weconnectu_php project, you need to edit the config.ini,  if  this  file does not exist you can create it and add the below information to it.  or you  can ammend the config.ini.example  and save it as config.ini

- the server name for the frontend that was used in  httpd-vhosts.conf  is  used in  FRONT_END_URL

    FRONT_END_URL = 'http://weconnectu.local_react'

- the username (u) and password (p) you used to Setup the Mysql server is used below. 

    DB_HOST=localhost
    DB_PORT=3306
    DB_DATABASE=weconnectudb
    DB_USERNAME=root
    DB_PASSWORD=kickstart

If you don't  want to  create as local DNS route ,   you  can simply navigate to theRoute  of the weconnectu_php project and run 
- php -S localhost:8000
- localhost:8000  is then used in the .env file of the front end (VITE_API_URL=http://localhost:8000)

## Frontend React system Setup 
In the weconnectu_react project, you need to edit the .env file, if this file does not exist you can create it and add the below information to it. or you  can ammend the .env.example  and save it as .env

- the server name for the backend that was used in  httpd-vhosts.conf  is  used in  VITE_API_URL
    VITE_API_URL=http://weconnectu.local_php

- the request to create an additional  page to display lists of the saved entries, has been  incorporated into  one page with the Submission page, it is a tabbed page 

in the route of the weconnectu_react project  you need  to run the  following command 
npm install 

If you don't  want to  create as local DNS route ,   you  can simply navigate to theRoute  of the weconnectu_php project and run 
- npm run dev 
- http://localhost:5173/  is then used in the config.ini file of the backend end (FRONT_END_URL = 'http://localhost:5173')

## Thanks 
Thank you  for  granting me the opportunity  to apply for a position at  your Company and  for taking the time to review my assesment ,  It is much apreciated 

