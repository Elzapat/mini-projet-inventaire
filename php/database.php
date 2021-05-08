<?php

require_once("constants.php");

class dbConnector {
    private $db;

    public function __construct() {
        // Connect to the database
        $this->db = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8",
                DB_USERNAME, DB_PASSWORD);
    }

    public function __destruct() {
        // Disconnect from the database
        unset($db);
    }

    // Get all of the employees
    public function getEmployees() {
        $request = "SELECT last_name, first_name, email FROM employee;";
        $statement = $this->db->prepare($request);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    // Get one employee by its email address
    public function getEmployee($email) {
        $request = "SELECT * FROM employee WHERE email = :email;";
        $statement = $this->db->prepare($request);
        $statement->bindParam(":email", $email, PDO::PARAM_STR, 30);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result[0];
    }

    // Get all of the equipments
    public function getEquipments() {
        $request = "SELECT name, serial_number FROM assignment;";
        $statement = $this->db->prepare($request);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    // Get one equipment by its serial number
    public function getEquipment($serialNumber) {
        $request = "SELECT a.serial_number, a.assignment_date, e.name, e.feature, e.manufacturing_date
                    FROM equipment e JOIN assignment a ON e.name = a.name
                    WHERE a.serial_number = :serial_number;";
        $statement = $this->db->prepare($request);
        $statement->bindParam(":serial_number", $serialNumber, PDO::PARAM_STR, 50);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result[0];
    }

    // Get all the equipments assigned to one employee, identified by its email
    public function getEmployeeEquipments($email) {
        $request = "SELECT a.serial_number, a.assignment_date, e.name, e.feature, e.manufacturing_date
                    FROM equipment e JOIN assignment a ON e.name = a.name
                    WHERE a.email = :email";
        $statement = $this->db->prepare($request);
        $statement->bindParam(":email", $email, PDO::PARAM_STR, 30);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
}

?>
