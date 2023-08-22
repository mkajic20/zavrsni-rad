const BP = require('../baza/baza.js');
const jwt = require('jsonwebtoken');
const konfiguracija = require('../konfiguracija.js');
const pom = require('../pomocneFunkcije.js');


exports.prijava = async function (zahtjev, odgovor) {
    const korisnik = zahtjev.body;
    const upit = `SELECT * FROM korisnici WHERE korime = '${korisnik.korime}'`;
    const rezultat = await BP.dohvati(upit);

    if(rezultat[0]){
        if(pom.provjeriLozinku(korisnik.lozinka, rezultat[0].lozinka)){
            const userId = rezultat[0].id;

            const token = jwt.sign({ userId }, konfiguracija.tajniKljuc);
            console.log(token)

            odgovor.json({ userId, token });
        } else {
            odgovor.status(401).json({ message: 'Pogresna lozinka' });
        }
    } else {
        odgovor.status(401).json({ message: 'Korisnik ne postoji' });
    }
};