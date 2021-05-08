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
    if (isset($data))
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
$apiVersion = array_shift($request);
$requestRessource = array_shift($request);

// If the ressource is not api, the version is not v1
// or the request ressource isn't set, send a Bad Request header
if ($ressource != "api" || $apiVersion != "v1" || !isset($requestRessource))
    send_response(null, 400);

$data = null;

switch ($requestRessource) {
    case "employees":
        if (isset($request[0]) && isset($request[1]) && $request[1] == "equipments")
            $data = $db->getEmployeeEquipments($request[0]);
        else if (isset($request[0]))
            $data = $db->getEmployee($request[0]);
        else
            $data = $db->getEmployees();
        break;
    case "equipments":
        if (isset($request[0]))
            $data = $db->getEquipment($request[0]);
        else
            $data = $db->getEquipments();
        break;
    default:
        send_reponse(null, 400);
}

$code = isset($data) ? 200 : 400;
send_response($data, $code);

?>
