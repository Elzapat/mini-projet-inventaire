CREATE DATABASE equipment;
USE equipment;

CREATE USER "PHP-mini-projet-CIR2"@"localhost" IDENTIFIED BY "pwdminiprojet";
GRANT ALL PRIVILEGES ON equipment.* TO "PHP-mini-projet-CIR2"@"localhost";
FLUSH PRIVILEGES;
