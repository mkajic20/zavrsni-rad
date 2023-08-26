const BP = require("../baza/baza.js");
const pom = require("../pomocneFunkcije.js");

exports.dohvatiProjekte = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const upit = `SELECT * FROM projekti WHERE korisnik_id = $id`;
    const vrijednosti = {
      $id: id,
    };
    const rezultat = await BP.dohvati(upit, vrijednosti);
    odgovor.json(rezultat);
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.kreirajProjekt = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const podaci = zahtjev.body;
    const upit = `INSERT INTO projekti (naziv, korisnik_id) VALUES($naziv, $id)`;
    const vrijednosti = {
      $naziv: podaci.naziv,
      $id: id,
    };

    try {
      const rezultat = await BP.izvrsi(upit, vrijednosti);
      const noviId = rezultat.lastID;
      odgovor.status(201).json(noviId);
    } catch (error) {
      odgovor
        .status(500)
        .json({ message: "Greška prilikom kreiranja zadatka" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.obrisiProjekt = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const id = zahtjev.body.id;
    const prviUpit = `DELETE FROM projektni_zadaci WHERE projekt_id = $id`;
    const drugiUpit = `DELETE FROM projekti WHERE id = $id`;
    const vrijednosti = {
      $id: id,
    };
    try {
      await BP.izvrsi(prviUpit, vrijednosti);
      await BP.izvrsi(drugiUpit, vrijednosti);
      odgovor.status(204).json();
    } catch (error) {
      odgovor
        .status(500)
        .json({ message: "Greška prilikom brisanja projekta" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.stanjaZavrsenosti = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const upit = `SELECT * FROM stanja_zavrsenosti`;
    const rezultat = await BP.dohvati(upit);
    odgovor.json(rezultat);
  }
};

exports.dohvatiProjekt = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const idProjekta = zahtjev.query.id;

    const projektiUpit = `SELECT naziv FROM projekti WHERE id = $id`;
    const vrijednosti = {
      $id: idProjekta,
    };
    const projektiRezultat = await BP.dohvati(projektiUpit, vrijednosti);
    const projektNaziv = projektiRezultat[0].naziv;

    const zadaciUpit = `
            SELECT p.id, p.naslov, p.opis, p.stanje_id
            FROM projektni_zadaci p
            WHERE p.projekt_id = $id
        `;
    const zadaciRezultat = await BP.dohvati(zadaciUpit, vrijednosti);

    const podaci = {
      naziv: projektNaziv,
      zadaci: zadaciRezultat,
    };

    odgovor.json(podaci);
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.kreirajProjektniZadatak = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const podaci = zahtjev.body;
    const upit = `INSERT INTO projektni_zadaci (naslov, opis, projekt_id, stanje_id) VALUES($naslov, $opis, $id, $stanje);`;
    const vrijednosti = {
      $naslov: podaci.naslov,
      $opis: podaci.opis,
      $id: podaci.id,
      $stanje: podaci.stanje,
    };
    try {
      const rezultat = await BP.izvrsi(upit, vrijednosti);
      const noviId = rezultat.lastID;
      odgovor.status(201).json(noviId);
    } catch (error) {
      odgovor
        .status(500)
        .json({ message: "Greška prilikom kreiranja zadatka" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.azurirajProjektniZadatak = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const podaci = zahtjev.body;
    const upit = `UPDATE projektni_zadaci SET stanje_id = $stanje WHERE id = $id`;
    const vrijednosti = {
      $stanje: podaci.stanje,
      $id: podaci.id,
    };
    try {
      await BP.izvrsi(upit, vrijednosti);
      odgovor.status(204).json();
    } catch (error) {
      odgovor
        .status(500)
        .json({ message: "Greška prilikom ažuriranja zadatka" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};
