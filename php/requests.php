<?php

function send_response($data, $code) {
    $messages = array(
        200 => "OK",
        400 => "Bad Request",
        500 => "Internal Server Error"
    );

    // Headers de la requête
    header("Content-Type: application/json; charset=utf8");
    header("Cache-control: no-store, no-cache, must-revalidate");
    header("Pragma: no-cache");
    header("HTTP/1.1 $code " . $messages[$code]);

    // Si les données existent, elles sont encodées en JSON et envoyées au client
    if (isset($data))
        echo json_encode($data);

    exit;
}

require_once("database.php");

// Si le type de requête n'est pas GET, la requête n'est pas traitable
if ($_SERVER["REQUEST_METHOD"] != "GET")
    send_response(null, 400);

$request = substr($_SERVER["PATH_INFO"], 1);
$request = explode("/", $request);

$ressource = array_shift($request);
$apiVersion = array_shift($request);
$requestRessource = array_shift($request);

// Si ce n'est pas l'API qui est demandée, que la version n'est pas v1
// ou que la ressource n'est pas spécifiée, la requête n'est pas traitable
if ($ressource != "api" || $apiVersion != "v1" || !isset($requestRessource))
    send_response(null, 400);

try {
    $db = new dbConnector();
} catch (PDOException $exception) {
    // S'il y a un problème a la connection à la base de données,
    // on renvoie une erreure interne au client
    error_log("Request error" . $exception->getMessage());
    send_response(null, 500);
}

$data = null;

switch ($requestRessource) {
    // Ressource "utilisateurs"
    case "utilisateurs":
        // Requête des materiels associé a un utilisateur
        if (isset($request[0]) && isset($request[1]) && $request[1] == "materiels")
            $data = $db->getMaterielsUtilisateur($request[0]);
        // Requête d'informations sur un utilisateur
        else if (isset($request[0]))
            $data = $db->getUtilisateur($request[0]);
        // Requête de tous les utilisateurs
        else
            $data = $db->getUtilisateurs();
        break;
    // Ressource "materiels"
    case "materiels":
        // Recherche pour savoir un un materiel existe
        if (isset($_GET["search"]))
            $data = $db->search($_GET["search"]);
        // Requête d'informations sur un materiel
        else if (isset($request[0]))
            $data = $db->getMateriel($request[0]);
        // Requêtes de tous les materiels
        else
            $data = $db->getMateriels();
        break;
    default:
        send_reponse(null, 400);
}

$code = isset($data) ? 200 : 400;
send_response($data, $code);

?>
