## Projet PHP CIR2 LORCY Benoit & VAN AMERONGEN Morgan

# Étapes préliminaires

* Il faut initialiser la base de donnée MySQL/MariaDB en utilisant<br>
les deux script sql fournis (`database.sql` et `content.sql`).<br>
* Le premier script à éxecuter est `database.sql` qui va créer la base de données<br>
et l'utilisateur, et qui va nous placer dans la base de données.<br>
* Ensuite, il faut éxecuter le script `content.sql` qui va créer les différentes
tables et les remplir.
* Nous avons fourni un fichier `.htaccess` pour rendre les liens vers l'API plus logiques.<br>
Le fichier de configuration VHost `2021-CIR2-prj-BL-MVA.conf` est aussi fourni.

# Utilisation

Il y a deux façons de tester notre API :
* En passant par le front (normalement, le site est host sur `http://php.lorcy.info`).
* En rentrant directement les liens pour éxecuter les requêtes API :
  * Liste de l'ensemble des utilisateurs<br>
  `GET /api/v1/utilisateurs`
  * Informations détaillées d'un utilisateur<br>
  `GET /api/v1/utilisateur/<mail>`
  * Liste de l'ensemble des matériel<br>
  `GET /api/v1/materiels`
  * Informations détaillées d'un matériel<br>
  `GET /api/v1/materiels/<nom>`
  * Liste des matériels associés à un utilisateur<br>
  `GET /api/v1/utilisateurs/<mail>/materiels`
  * Recherche d'un matériel à partir d'un numéro de série<br>
  `GET /api/v1/materiels?search=num_serie&num=<num_serie>`
  * Si, pour n'importe quelle raison, l'URL mapping ne marche pas, on peut accéder<br>
  à ces ressources en préfixant les URL par `/php/requests.php`. Example :<br>
  `GET /php/requests.php/api/v1/utilisateurs`
