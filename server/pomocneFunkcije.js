const bcrypt = require("bcrypt");
const konfiguracija = require("./konfiguracija.js");
const jwt = require("jsonwebtoken");

exports.provjeriLozinku = function (lozinka, enkriptiranaLozinka) {
  return bcrypt.compareSync(lozinka, enkriptiranaLozinka);
};

exports.enkripcijaLozinke = function (lozinka) {
  const sol = 10;
  return bcrypt.hashSync(lozinka, sol);
};

exports.kreirajJWT = function (korisnikId) {
  return jwt.sign({ korisnikId }, konfiguracija.tajniKljuc);
};

exports.provjeriJWT = function (token, korisnikId) {
  try {
    const dekodirano = jwt.verify(token, konfiguracija.tajniKljuc);
    return dekodirano.korisnikId == korisnikId;
  } catch (error) {
    return false;
  }
};

exports.provjeriZahtjev = function (zahtjev) {
  const token = zahtjev.headers.authorization;
  const id = zahtjev.params.id;
  const provjera = exports.provjeriJWT(token, id);
  return provjera;
};
