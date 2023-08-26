const BP = require("../baza/baza.js");
const pom = require("../pomocneFunkcije.js");

exports.dohvatiKategorije = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const upit = `SELECT * FROM kategorije WHERE korisnik_id = $id OR korisnik_id = 1`;
    const vrijednosti = {
      $id: id,
    };
    const rezultat = await BP.dohvati(upit, vrijednosti);
    odgovor.json(rezultat);
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.kreirajKategoriju = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const podaci = zahtjev.body;
    const upit = `INSERT INTO kategorije (naziv, korisnik_id) VALUES($naziv, $id)`;
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
        .json({ message: "Greška prilikom kreiranja kategorije" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.dohvatiBiljeske = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const upit = `SELECT * FROM biljeske WHERE korisnik_id = $id`;
    const vrijednosti = {
      $id: id,
    };
    const biljeske = await BP.dohvati(upit, vrijednosti);

    const upit2 = `SELECT * FROM kategorije_biljeski WHERE korisnik_id = $id`;
    const kategorijeBiljeski = await BP.dohvati(upit2, vrijednosti);

    const spojeniPodaci = biljeske.map((biljeska) => {
      const zajednickeKategorije = kategorijeBiljeski.filter(
        (kategorija) => kategorija.biljeska_id === biljeska.id
      );
      const favorit = zajednickeKategorije.some(
        (kategorija) => kategorija.kategorija_id === 1
      );

      return {
        ...biljeska,
        kategorije: zajednickeKategorije,
        favorit: favorit,
      };
    });

    odgovor.json(spojeniPodaci);
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.kreirajBiljesku = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const podaci = zahtjev.body;
    const upit = `INSERT INTO biljeske (naslov, sadrzaj, korisnik_id) VALUES($naslov, ' ', $id)`;
    const vrijednosti = {
      $naslov: podaci.naslov,
      $id: id,
    };

    try {
      const rezultat = await BP.izvrsi(upit, vrijednosti);
      const noviId = rezultat.lastID;

      const drugiUpit = `INSERT INTO kategorije_biljeski (biljeska_id, kategorija_id, korisnik_id) VALUES( $idBiljeske, 2, $id)`;
      const vrijednosti2 = {
        $idBiljeske: noviId,
        $id: id,
      };
      await BP.izvrsi(drugiUpit, vrijednosti2);

      odgovor.status(201).json(noviId);
    } catch (error) {
      odgovor
        .status(500)
        .json({ message: "Greška prilikom kreiranja bilješke" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.azurirajBiljesku = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const podaci = zahtjev.body;
    const upit = `UPDATE biljeske SET sadrzaj = $sadrzaj WHERE id = $id`;
    const vrijednosti = {
      $sadrzaj: podaci.sadrzaj,
      $id: podaci.id,
    };
    try {
      await BP.izvrsi(upit, vrijednosti);
      odgovor.status(204).json();
    } catch (error) {
      odgovor
        .status(500)
        .json({ message: "Greška prilikom ažuriranja bilješke" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.obrisiBiljesku = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const id = zahtjev.body.id;
    const prviUpit = `DELETE FROM kategorije_biljeski WHERE biljeska_id = $id`;
    const drugiUpit = `DELETE FROM biljeske WHERE id = $id`;
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
        .json({ message: "Greška prilikom brisanja bilješke" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
}

exports.dohvatiBiljesku = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const id = zahtjev.query.id;
    const upit = `SELECT * FROM biljeske WHERE id = $id`;
    const vrijednosti = {
      $id: id,
    };
    const rezultat = await BP.dohvati(upit, vrijednosti);

    const drugiUpit = `SELECT kategorija_id FROM kategorije_biljeski WHERE biljeska_id = $id`;

    const rezultat2 = await BP.dohvati(drugiUpit, vrijednosti);
    const kategorije = rezultat2.map((item) => item.kategorija_id);

    const podaci = {
      id: rezultat[0].id,
      naslov: rezultat[0].naslov,
      sadrzaj: rezultat[0].sadrzaj,
      kategorije: kategorije,
    };

    odgovor.json(JSON.stringify(podaci));
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.kreirajKategorijuBiljeske = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const podaci = zahtjev.body;
    const upit = `INSERT INTO kategorije_biljeski (biljeska_id, kategorija_id, korisnik_id) VALUES($idBiljeske, $idKategorije, $id)`;
    const vrijednosti = {
      $idBiljeske: podaci.idBiljeske,
      $idKategorije: podaci.idKategorije,
      $id: id,
    };
    try {
      await BP.izvrsi(upit, vrijednosti);
      odgovor.status(201).json();
    } catch (error) {
      odgovor
        .status(500)
        .json({ message: "Greška prilikom postavljanja kategorije" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.obrisiKategorijuBiljeske = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const podaci = zahtjev.body;
    const upit = `DELETE FROM kategorije_biljeski WHERE biljeska_id = $idBiljeske AND kategorija_id = $idKategorije`;
    const vrijednosti = {
      $idBiljeske: podaci.idBiljeske,
      $idKategorije: podaci.idKategorije,
    };

    try {
      await BP.izvrsi(upit, vrijednosti);
      odgovor.status(201).json();
    } catch (error) {
      odgovor
        .status(500)
        .json({ message: "Greška prilikom brisanja kategorije" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.dohvatiBiljeskeFavorite = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const upit = `
            SELECT DISTINCT b.*
            FROM biljeske b
            INNER JOIN kategorije_biljeski kb ON b.id = kb.biljeska_id
            WHERE kb.kategorija_id = 1
            AND kb.korisnik_id = $id
        `;

    const vrijednosti = {
      $id: id,
    };
    const rezultat = await BP.dohvati(upit, vrijednosti);
    odgovor.json(rezultat);
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};
