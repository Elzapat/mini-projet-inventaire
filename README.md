
# Projet PHP CIR2 LORCY Benoit & VAN AMERONGEN Morgan

## Étapes préliminaires

* Il faut initialiser la base de donnée MySQL/MariaDB en utilisant<br>
les deux script sql fournis (`database.sql` et `content.sql`).<br>
* Le premier script à éxecuter est `database.sql` qui va créer la base de données<br>
et l'utilisateur, et qui va nous placer dans la base de données.<br>
* Ensuite, il faut éxecuter le script `content.sql` qui va créer les différentes
tables et les remplir.
* Ci-dessous sont fournis un fichier de configuration VHost et un .htaccess.<br>
Pour que l'URL Mapping fonctionne, il faut activer le module Rewrite.
* 2021-CIR2-prj-BL-MVA.conf
```
<VirtualHost *:80>
    ServerName 2021-CIR2-prj-BL-MVA

    ErrorLog /var/log/apache2/2021-CIR2-prj-BL-MVA

    DocumentRoot /var/www/html/2021-CIR2-prj-BL-MVA
    <Directory /var/www/html/2021-CIR2-prj-BL-MVA>
        AllowOverride All
        DirectoryIndex index.html
        Require all granted 
    </Directory>
</VirtualHost>
```
* .htaccess
```
RewriteEngine On
Options +FollowSymLinks
Options All -Indexes
RewriteRule ^api/v1(.*) php/requests.php/%{REQUEST_URI} [QSA]
<FilesMatch "(constants.php|database.php)$">
    Order allow,deny
    Deny from all
</FilesMatch>
```

## Utilisation

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
