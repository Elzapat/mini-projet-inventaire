<?php

require_once("constants.php");

class dbConnector {
    private $db;

    public function __construct() {
        // Connection à la base de données
        $this->db = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8",
                DB_USERNAME, DB_PASSWORD);
    }

    public function __destruct() {
        // Deconnection de la base de données
        unset($db);
    }

    // Envoie tout les utilisateurs
    public function getUtilisateurs() {
        $request = "SELECT nom, prenom, mail FROM utilisateur;";
        $statement = $this->db->prepare($request);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    // Renvoie des informations sur un utilisateur, identifié par son adresse mail
    public function getUtilisateur($mail) {
        $request = "SELECT * FROM utilisateur WHERE mail = :mail;";
        $statement = $this->db->prepare($request);
        $statement->bindParam(":mail", $mail, PDO::PARAM_STR, 30);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return count($result) > 0 ? $result[0] : null;
    }

    // Renvoie tout les materiels
    public function getMateriels() {
        $request = "SELECT nom FROM materiel;";
        $statement = $this->db->prepare($request);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    // Informations sur un matériel identifié par son nom 
    public function getMateriel($nom) {
        $nom = str_replace("'", "", $nom);

        $request = "SELECT * FROM materiel WHERE nom = :nom";
        $statement = $this->db->prepare($request);
        $statement->bindParam(":nom", $nom, PDO::PARAM_STR, 50);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        return count($result) > 0 ? $result[0] : null;
    }

    // Tout les materiels associés a un utilisateur
    public function getMaterielsUtilisateur($mail) {
        $request = "SELECT a.num_serie, a.date_association, e.nom, e.caracteristique, e.date_fabrication
                    FROM materiel e JOIN association a ON e.nom = a.nom
                    WHERE a.mail = :mail";
        $statement = $this->db->prepare($request);
        $statement->bindParam(":mail", $mail, PDO::PARAM_STR, 30);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    // Permet de chercher si un enregistrement existe dans la base de donnée 
    // en fonction d'une valeur
    public function search($searchValue) {
        switch ($searchValue) {
            case "num_serie":
                $numSerie = $_GET["num"];
                $request = "SELECT nom FROM association WHERE num_serie = :num_serie;";
                $statement = $this->db->prepare($request);
                $statement->bindParam(":num_serie", $numSerie, PDO::PARAM_STR, 30);
                $statement->execute();

                return !empty($statement->fetchAll(PDO::FETCH_ASSOC));
            default:
                return null;
        }
    }
}

?>
