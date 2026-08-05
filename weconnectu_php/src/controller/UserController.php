<?php

define('APP_ROOT', dirname(__DIR__)); 
require APP_ROOT . '/service/DbService.php';

class User {
  // Properties
    private string $userName;
    private string $email;
    private string $phoneNumber ;
    private string $message ; 

    
  // Method to set the properties
    public function __construct(string $userName = '', string $email = '', string $phoneNumber = '', string $message = '')
    {
        $this->userName = $userName;
        $this->email = $email;
        $this->phoneNumber = $phoneNumber;
        $this->message = $message;
    }

    // Method to  Store  User Data 
    public  function store(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        //  We need to  Validate  the input Data
        try{
            $this->userName = $data['name'];
            $this->email = $data['email'];
            $this->phoneNumber = $data['phonenumber'];
            $this->message = $data['message'];

            //Validating Phone Number
            $pattern = '/^(27|0)[1-8][0-9]{8}$/';

            if (!preg_match($pattern, $this->phoneNumber)) {
                throw new \Exception("CellPhone number Invalid South African number - Error ",500 ) ;
            }

            //Validating Email address
            if(!filter_var( $this->email, FILTER_VALIDATE_EMAIL))
            {
                throw new \Exception("Invalid Email Address  - Error ",500 ) ;
            }

            // Validating Username
            if (!is_string($this->userName)) {
                 throw new \Exception("Invalid User Name   - Error ",500 ) ;
            }elseif( strlen(trim($this->userName)) === 0){
                throw new \Exception("Empty User Name   - Error ",500 ) ;
            }
            
            //validating Message 
            if (!is_string($this->message)) {
                    throw new \Exception("Invalid User Name   - Error ",500 ) ;
            }elseif( strlen(trim($this->message)) === 0){
                throw new \Exception("Empty User Name   - Error ",500 ) ;
            }
            
        } catch (Exception $e) {

            $statusCode = $e->getCode();
            http_response_code($statusCode);
            echo json_encode(["error" => $e->getMessage()]);
            return;
        }

        try {
            //  Preparing the  SQL

            $sql = "INSERT INTO users (name,email,phonenumber ,message) VALUES (?, ?, ?,?)";

            // Connecting to the Database 
            $conn = new DbService() ; 

            if($stmt = $conn->connection->prepare($sql)) {

                $stmt->bind_param("ssss",$this->userName,
                    $this->email ,
                    $this->phoneNumber, 
                    $this->message );

                    if($stmt->execute()){

                        unset($conn);
                        http_response_code(201);
                        echo json_encode(['Message' =>"Success in Adding User"]);
                        return ; 
                    }else {
                        unset($conn);
                        throw new \Exception("Database  Error ",500 ) ;     
                    }
            }else{
                throw new \Exception("Database  Error ",500 ) ; 
            }

        } catch (Exception $e) {
            if ($e->getCode() === 1062) {
                http_response_code(409);
                echo json_encode(["error" => "A user with this Detail already exists. The Email and Phone Number Needs to be unique"]);
                return;
            }
            http_response_code(500);
            echo json_encode(["error" => "Database Error"]);
            return ;
        }


    }

    // Method to display the User Details
    public  function get_user_detail(int $id ) {
    
        try {
            //  Preparing the  SQL 

            $sql = "select * from  users where id = ?";

            // Connecting to the Database 
            $conn = new DbService() ; 

            if($stmt = $conn->connection->prepare($sql)) {

                $stmt->bind_param("i",$id);

                if($stmt->execute()){

                    $result = $stmt->get_result();
            
                    $response = [
                        'Message' =>"Success in retrieving usin User",
                        'success' => true,
                        'count' => $result->num_rows,
                        'data' => $result->fetch_all(MYSQLI_ASSOC)
                    ];

                    unset($conn);
                    http_response_code(200);
                    echo json_encode($response, JSON_PRETTY_PRINT );
                    return ;
                }else {
                    unset($conn);
                    throw new \Exception("Database  Error ",500 ) ;     
                }
            }else{
                throw new \Exception("Database  Error ",500 ) ; 
            }

        } catch (Exception $e) {
            $statusCode = $e->getCode();
            http_response_code($statusCode);
            echo json_encode(["error" => $e->getMessage()]);
            return ;
        }

    }

    // Method to display the User List
    public  function get_userlist() {

        try {
            //  Preparing the  SQL 

            $sql = "select id, name , email from  users ";

            // Connecting to the Database 
            $conn = new DbService() ; 

            if($stmt = $conn->connection->prepare($sql)) {

                if($stmt->execute()){

                    $result = $stmt->get_result();
                             
                    $response = [
                        'Message' =>"Success in retrieving Users List ",
                        'success' => true,
                        'count' => $result->num_rows,
                        'data' => $result->fetch_all(MYSQLI_ASSOC)
                    ];

                    unset($conn);
                    http_response_code(200);
                    echo json_encode($response, JSON_PRETTY_PRINT );
                    return ; 
                }else {
                    unset($conn);
                    throw new \Exception("Database  Error ",500 ) ;     
                }
            }else{
                throw new \Exception("Database  Error ",500 ) ; 
            }

        } catch (Exception $e) {
            $statusCode = $e->getCode();
            http_response_code($statusCode);
            echo json_encode(["error" => $e->getMessage()]);
            return ;
        }
    }


}

?>