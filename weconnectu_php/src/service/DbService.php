<?php

class DbService{
        private $Db  = array() ;
        public $connection ;

        public function __construct()
        {
           $db = parse_ini_file(__DIR__ ."/../../config.ini") ;

           $servername = $db['DB_HOST'] ;
           $username   = $db['DB_USERNAME'];
           $password   = $db['DB_PASSWORD'];
           $dbname     = $db['DB_DATABASE'];
        
            $this->connection =  new mysqli($servername, $username, $password, $dbname);
            if ($this->connection->connect_error) {
                throw new \Exception("Database  Error"); 
            }
        }

        public function __destruct()
        {
            $this->connection->close() ;
            
        }

}


?>