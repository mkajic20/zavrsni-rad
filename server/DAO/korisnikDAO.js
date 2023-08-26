const BP = require("../baza/baza.js");
const pom = require("../pomocneFunkcije.js");

exports.prijava = async function (zahtjev, odgovor) {
  const korisnik = zahtjev.body;
  const upit = `SELECT * FROM korisnici WHERE korime = '${korisnik.korime}'`;
  const rezultat = await BP.dohvati(upit);

  if (rezultat[0]) {
    if (pom.provjeriLozinku(korisnik.lozinka, rezultat[0].lozinka)) {
      const korisnikId = rezultat[0].id;
      const token = pom.kreirajJWT(korisnikId);
      odgovor.json({ korisnikId, token });
    } else {
      odgovor.status(401).json({ message: "Pogresna lozinka" });
    }
  } else {
    odgovor.status(401).json({ message: "Korisnik ne postoji" });
  }
};

exports.registracija = async function (zahtjev, odgovor) {
  const korisnik = zahtjev.body;
  const enkriptiranaLozinka = pom.enkripcijaLozinke(korisnik.lozinka);
  const upit = `INSERT INTO korisnici (korime, lozinka) VALUES('${korisnik.korime}', '${enkriptiranaLozinka}')`;

  try {
    await BP.izvrsi(upit);

    const upitDohvat = `SELECT * FROM korisnici WHERE korime = '${korisnik.korime}'`;
    const rezultat = await BP.dohvati(upitDohvat);

    if (rezultat[0]) {
      const korisnikId = rezultat[0].id;
      const token = pom.kreirajJWT(korisnikId);
      odgovor.json({ korisnikId, token });
    } else {
      odgovor
        .status(500)
        .json({
          message: "Greška prilikom dohvata korisnika nakon registracije",
        });
    }
  } catch (error) {
    odgovor.status(500).json({ message: "Greška prilikom registracije" });
  }
};
