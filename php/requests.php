<?php

function send_response($data, $code) {
    $messages = array(
        200 => "OK",
        400 => "Bad Request",
        500 => "Internal Server Error"
    );

    header("Content-Type: application/json; charset=utf8");
    header("Cache-control: no-store, no-cache, must-revalidate");
    header("Pragma: no-cache");
    header("HTTP/1.1 $code " . $messages[$code]);

    // If the data isn't null, encode it to JSON and send it
    if ($data)
        echo json_encode($data);

    exit;
}

require_once("database.php");

// If the request method isn't GET, the request isn't correct
if ($_SERVER["REQUEST_METHOD"] != "GET")
    send_response(null, 400);

try {
    $db = new dbConnector();
} catch (PDOException $exception) {
    // If there was a problem accessing the database
    // we send an error to the client
    error_log("Request error" . $exception->getMessage());
    send_response(null, 500);
}

$request = substr($_SERVER["PATH_INFO"], 1);
$request = explode("/", $request);

$ressource = array_shift($request);
$APIVersion = array_shift($request);
$requestRessource = array_shift($request);
$parameter = array_shift($request);

if ($ressource != "api" || $APIVersion != "V1" || !$requestRessource)
    send_response(null, 400);

$data = null;

switch ($requestRessource) {
    case "employees":
        if ($parameter)
            $data = $db->getEmployee($parameter);
        else
            $data = $db->getEmployees();
        break;
    case "equipments":
        if ($parameter)
            $data = $db->getEquipment($parameter);
        else
            $data = $db->getEquipments();
        break;
    default:
        send_reponse(null, 400);
}

if ($data)
    send_response($data, 200);
else
    send_response(null, 400);

?>
