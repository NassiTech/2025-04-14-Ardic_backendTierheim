



CREATE TABLE IF NOT EXISTS tiere (
   id INTEGER PRIMARY KEY,
    tierart VARCHAR(50),
    name VARCHAR (50),
    krankheit VARCHAR (100),
    age INTEGER,
    gewicht REAL);

SELECT * FROM tiere;

INSERT INTO  tiere (tierart, name,krankheit,age,gewicht);; 
VALUES ("Katze","Paw","schnupfen",5, 7.1);

INSERT INTO tiere (tierart, name, krankheit, age, gewicht)
VALUES ("Hund", "Chase", "zecken", 7, 14.8);

INSERT INTO tiere (tierart, name, krankheit, age, gewicht);
VALUES ("Papagei", "Jack", "federallergie", 2, 0.9);
INSERT INTO tiere (tierart, name, krankheit, age, gewicht);
VALUES ("Meerschweinchen", "Ham", "gesund", 1, 0.75);

INSERT INTO tiere (tierart, name, krankheit, age, gewicht);
VALUES ("Pferd", "Esel", "kolik", 10, 550);
DELETE FROM tiere WHERE id = ?