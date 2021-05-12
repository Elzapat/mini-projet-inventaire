-- Assigment table
CREATE TABLE association (
    num_serie varchar(50) NOT NULL,
    date_association date NOT NULL,
    mail varchar(50) NOT NULL,
    nom varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Content of association table
INSERT INTO association (num_serie, date_association, mail, nom) VALUES
("2017-01009", "2017-05-04", "mair@isen.fr", "PC intel i7 - 16 - 512"),
("2017-01010", "2020-05-04", "mair@isen.fr", "souris vert"),
("2017-01012", "2020-06-23", "mair@isen.fr", "clavier mecanique"),
("2017-01013", "2020-07-02", "mair@isen.fr", "microphone"),
("2017-01014", "2020-07-20", "dupont@isen.fr", "nintendo switch"),
("2017-01015", "2020-08-30", "dupont@isen.fr", "gourde bleue"),
("2017-01016", "2020-09-18", "lorcy@isen.fr", "alimentation 12V"),
("2017-01017", "2020-11-04", "lorcy@isen.fr", "SSD 256GO"),
("2017-01018", "2021-02-14", "vanamerongen@isen.fr", "basse electrique");

-- Equipment table
CREATE TABLE materiel (
    nom varchar(50) NOT NULL,
    caracteristique varchar(250) NOT NULL,
    date_fabrication int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Content of materiel table
INSERT INTO materiel (nom, caracteristique, date_fabrication) VALUES
("PC intel i7 - 16 - 512", "PC intel i7 - 16go Ram - ssd 512 go", 2016),
("souris vert", "souris optique verticale", 2019),
("clavier mecanique", "clavier mecanique a switchs MX Cherry Brown", 2020),
("microphone", "microphone avec cable XLR", 2016),
("nintendo switch", "nintendo switch noire avec joycons jaune et violet", 2018),
("gourde bleue", "gourde bleue d'une contenance d'un litre", 2015),
("alimentation 12V", "alimentation 12V avec cable", 1995),
("SSD 256GO", "SSD d'une capacité de 256 GO", 2019),
("basse electrique", "basse electrique 4 cordes de marque Ibanez", 2012);

-- User table
CREATE TABLE utilisateur (
    mail varchar(50) NOT NULL,
    nom varchar(50) NOT NULL,
    prenom varchar(50) NOT NULL,
    date_embauche date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Content of utilisateur table
INSERT INTO utilisateur (mail, nom, prenom, date_embauche) VALUES
("dupont@isen.fr", "dupont", "joel", "2020-05-04"),
("mair@isen.fr", "mair", "gerard", "2019-08-04"),
("lorcy@isen.fr", "lorcy", "benoit", "2016-08-28"),
("vanamerongen@isen.fr", "van amerongen", "morgan", "2017-05-29");

-- Keys for association table
ALTER TABLE association
ADD PRIMARY KEY (num_serie),
ADD KEY association_utilisateur_FK (mail),
ADD KEY association_materiel0_FK (nom);

-- Keys for materiel table
ALTER TABLE materiel
ADD PRIMARY KEY (nom);

-- Keys for utilisateur table
ALTER TABLE utilisateur
ADD PRIMARY KEY (mail);

-- Constraints for association table
ALTER TABLE association
ADD CONSTRAINT association_materiel0_FK FOREIGN KEY (nom)
REFERENCES materiel (nom),
ADD CONSTRAINT association_utilisateur_FK FOREIGN KEY (mail)
REFERENCES utilisateur (mail);
