PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS korisnici (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  korime VARCHAR(20) NOT NULL UNIQUE,
  lozinka TEXT NOT NULL,
  UNIQUE (korime));

CREATE TABLE IF NOT EXISTS trajni_zadaci (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  naslov VARCHAR(30) NOT NULL UNIQUE,
  opis VARCHAR(100),
  zavrsen BOOLEAN NOT NULL,
  korisnik_id INTEGER NOT NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id));

CREATE TABLE IF NOT EXISTS tjedni_zadaci (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  naslov VARCHAR(30) NOT NULL UNIQUE,
  opis VARCHAR(100),
  korisnik_id INTEGER NOT NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id));

CREATE TABLE IF NOT EXISTS tjedni_podaci (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  tjedan VARCHAR(30) NOT NULL,
  postavljeno BOOLEAN NOT NULL,
  zadatak_id VARCHAR(100),
  korisnik_id INTEGER NOT NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id),
  FOREIGN KEY (zadatak_id) REFERENCES tjedni_zadaci(id)
  UNIQUE (tjedan, zadatak_id));

CREATE TABLE IF NOT EXISTS dnevni_zadaci (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  naslov VARCHAR(30) NOT NULL UNIQUE,
  opis VARCHAR(100),
  korisnik_id INTEGER NOT NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id));

CREATE TABLE IF NOT EXISTS dnevni_podaci (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  datum VARCHAR(30) NOT NULL,
  postavljeno BOOLEAN NOT NULL,
  zadatak_id VARCHAR(100),
  korisnik_id INTEGER NOT NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id),
  FOREIGN KEY (zadatak_id) REFERENCES dnevni_zadaci(id)
  UNIQUE (tjedan, zadatak_id));

CREATE TABLE IF NOT EXISTS projekti (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  naziv VARCHAR(30) NOT NULL,
  korisnik_id INTEGER NOT NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id));

CREATE TABLE IF NOT EXISTS stanja_zavrsenosti (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  naziv VARCHAR(30) NOT NULL UNIQUE);

CREATE TABLE IF NOT EXISTS projektni_zadaci (
   id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  naslov VARCHAR(30) NOT NULL,
  opis VARCHAR(100),
  projekt_id INTEGER NOT NULL,
  stanje_id INTEGER NOT NULL,
  datum_zavrsetka VARCHAR(30) NOT NULL,
  datum_kreiranja VARCHAR(30) NOT NULL,
  datum_promjene VARCHAR(30),
  FOREIGN KEY (projekt_id) REFERENCES projekt(id)
  FOREIGN KEY (stanje_id) REFERENCES stanja_zavrsenosti(id));

CREATE TABLE IF NOT EXISTS kategorije (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  naziv VARCHAR(30) NOT NULL,
  korisnik_id INTEGER NOT NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id));

CREATE TABLE IF NOT EXISTS biljeske (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  naslov VARCHAR(30) NOT NULL,
  sadrzaj VARCHAR(1000) NOT NULL,
  korisnik_id INTEGER NOT NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id));

CREATE TABLE IF NOT EXISTS kategorije_biljeski (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  biljeska_id INTEGER NOT NULL,
  kategorija_id INTEGER NOT NULL,
  korisnik_id INTEGER NOT NULL,
  FOREIGN KEY (biljeska_id) REFERENCES biljeske(id)
  FOREIGN KEY (kategorija_id) REFERENCES kategorije(id)
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id));

INSERT INTO korisnici (id, korime, lozinka) VALUES
(0, 'test', 'test123456'),
(1, 'mkajic20', '123456');

INSERT INTO trajni_zadaci (naslov, opis, zavrsen, korisnik_id) VALUES
('Zadatak 1', 'Opis zadatka 1', 0, 1),
('Zadatak 2', 'Opis zadatka 2', 1, 1);

INSERT INTO tjedni_zadaci (naslov, opis, korisnik_id) VALUES
('Tjedni zadatak 1', 'Opis tjednog zadatka 1', 1),
('Tjedni zadatak 2', 'Opis tjednog zadatka 2', 1);

INSERT INTO tjedni_podaci (tjedan, postavljeno, zadatak_id, korisnik_id) VALUES
('2023-08-01', 1, 1, 1),
('2023-08-01', 0, 2, 1);

INSERT INTO dnevni_zadaci (naslov, opis, korisnik_id) VALUES
('Dnevni zadatak 1', 'Opis dnevnog zadatka 1', 1),
('Dnevni zadatak 2', 'Opis dnevnog zadatka 2', 1);

INSERT INTO dnevni_podaci (tjedan, postavljeno, zadatak_id, korisnik_id) VALUES
('2023-08-01', 1, 1, 1),
('2023-08-01', 0, 2, 1);

INSERT INTO projekti (naziv, korisnik_id) VALUES
('Projekt 1', 1),
('Projekt 2', 1);

INSERT INTO stanja_zavrsenosti (naziv) VALUES
('Nije započeto'),
('Izvršava se'),
('Završeno'),
('Odgođeno'),
('Odbačeno');

INSERT INTO projektni_zadaci (naslov, opis, projekt_id, stanje_id) VALUES
('Projektni zadatak 1', 'Opis projektnog zadatka 1', 1, 1),
('Projektni zadatak 2', 'Opis projektnog zadatka 2', 2, 2);

INSERT INTO kategorije (id, naziv, korisnik_id) VALUES
(1, 'Favoriti', 0),
(2, 'Kategorija 1', 1),
(3, 'Kategorija 2', 1),
(9999, 'Sve bilješke', 0);

INSERT INTO biljeske (naslov, sadrzaj, korisnik_id) VALUES
('Bilješka 1', 'Sadržaj bilješke 1', 1),
('Bilješka 2', 'Sadržaj bilješke 2', 1);

INSERT INTO kategorije_biljeski (biljeska_id, kategorija_id) VALUES
(1, 1),
(2, 2), 
(1, 3),
(1, 9999),
(2, 9999);

SELECT * FROM korisnici;
SELECT * FROM trajni_zadaci;
SELECT * FROM tjedni_zadaci;
SELECT * FROM tjedni_podaci;
SELECT * FROM dnevni_zadaci;
SELECT * FROM dnevni_podaci;
SELECT * FROM projekti;
SELECT * FROM stanja_zavrsenosti;
SELECT * FROM projektni_zadaci;
SELECT * FROM kategorije;
SELECT * FROM biljeske;
SELECT * FROM kategorije_biljeski;
