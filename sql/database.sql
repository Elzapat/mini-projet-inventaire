CREATE DATABASE materiel;
USE materiel;

CREATE USER "PHP-mini-projet-CIR2"@"localhost" IDENTIFIED BY "pwdminiprojet";
GRANT ALL PRIVILEGES ON materiel.* TO "PHP-mini-projet-CIR2"@"localhost";
FLUSH PRIVILEGES;
