const BP = require("../baza/baza.js");
const pom = require("../pomocneFunkcije.js");

// TRAJNI ZADACI

exports.dohvatiTrajneZadatke = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const upit = `SELECT * FROM trajni_zadaci WHERE korisnik_id = $id`;
    const vrijednosti = {
      $id: id
    };
    const rezultat = await BP.dohvati(upit, vrijednosti);
    odgovor.json(rezultat);
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.kreirajTrajniZadatak = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const zadatak = zahtjev.body;
    const upit = `INSERT INTO trajni_zadaci (naslov, opis, zavrsen, korisnik_id) VALUES($naslov, $opis, 0, $id)`;
    const vrijednosti = {
      $naslov: zadatak.naslov,
      $opis: zadatak.opis,
      $id: id
    }
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

exports.azurirajTrajniZadatak = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const zadatak = zahtjev.body;
    const upit = `UPDATE trajni_zadaci SET zavrsen = $zavrsen WHERE id = $zadatakId`;
    const vrijednosti = {
      $zavrsen: zadatak.zavrsen,
      $zadatakId: zadatak.zadatakId
    }
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

exports.izbrisiTrajniZadatak = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const id = zahtjev.body.id;
    const upit = `DELETE FROM trajni_zadaci WHERE id = $id`;
    const vrijednosti = {
      $id: id
    }
    try {
      await BP.izvrsi(upit, vrijednosti);
      odgovor.status(204).json();
    } catch (error) {
      odgovor.status(500).json({ message: "Greška prilikom brisanja zadatka" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

// DNEVNI ZADACI

exports.dohvatiDnevneZadatke = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const upit = `SELECT * FROM dnevni_zadaci WHERE korisnik_id = $id`;
    const vrijednosti = {
      $id: id
    }
    const rezultat = await BP.dohvati(upit, vrijednosti);
    odgovor.json(rezultat);
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.kreirajDnevniZadatak = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const zadatak = zahtjev.body;
    const upit = `INSERT INTO dnevni_zadaci (naslov, opis, korisnik_id) VALUES($naslov, $opis, $id)`;
    const vrijednosti = {
      $naslov: zadatak.naslov,
      $opis: zadatak.opis,
      $id: id
    }
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

exports.izbrisiDnevniZadatak = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const id = zahtjev.body.id;
    const prviUpit = `DELETE FROM dnevni_podaci WHERE zadatak_id = $id`;
    const drugiUpit = `DELETE FROM dnevni_zadaci WHERE id = $id`;
    const vrijednosti = {
      $id: id
    };
    try {
      await BP.izvrsi(prviUpit, vrijednosti);
      await BP.izvrsi(drugiUpit, vrijednosti);
      odgovor.status(204).json();
    } catch (error) {
      odgovor.status(500).json({ message: "Greška prilikom brisanja zadatka" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.dohvatiDnevnePodatke = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const upit = `SELECT * FROM dnevni_podaci WHERE korisnik_id = $id AND datum = $datum`;
    const vrijednosti = {
      $id: id,
      $datum: zahtjev.query.datum
    }
    const rezultat = await BP.dohvati(upit, vrijednosti);

    const podaci = rezultat.map((item) => ({
      id: parseInt(item.zadatak_id),
      postavljeno: item.postavljeno === 1,
    }));

    odgovor.json(podaci);
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.dohvatiDnevnePodatkeKorisnika = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const upit = `SELECT * FROM dnevni_podaci WHERE korisnik_id = $id`;
    const vrijednosti = {
      $id: id,
    }
    const rezultat = await BP.dohvati(upit, vrijednosti);


    odgovor.json(rezultat);
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
}

exports.kreirajDnevniPodatak = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const podaci = zahtjev.body;
    const upit = `INSERT INTO dnevni_podaci (datum, postavljeno, zadatak_id, korisnik_id) VALUES($datum, 1, $idZadatka, $id)`;
    const vrijednosti = { 
      $datum: podaci.dan,
      $idZadatka: podaci.idZadatka,
      $id: id
    }

    try {
      await BP.izvrsi(upit, vrijednosti);
      odgovor.status(201).json();
    } catch (error) {
      odgovor
        .status(500)
        .json({ message: "Greška prilikom kreiranja zadatka" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.izbrisiDnevniPodatak = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const id = zahtjev.body.idZadatka;
    const upit = `DELETE FROM dnevni_podaci WHERE zadatak_id = $id AND datum = $datum`;
    const vrijednosti = {
      $id: id,
      $datum: zahtjev.body.datum
    }
    try {
      await BP.izvrsi(upit, vrijednosti);
      odgovor.status(204).json();
    } catch (error) {
      odgovor.status(500).json({ message: "Greška prilikom brisanja zadatka" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

// TJEDNI ZADACI

exports.dohvatiTjedneZadatke = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const upit = `SELECT * FROM tjedni_zadaci WHERE korisnik_id = $id`;
    const vrijednosti = {
      $id: id
    }
    const rezultat = await BP.dohvati(upit, vrijednosti);
    odgovor.json(rezultat);
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.kreirajTjedniZadatak = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const zadatak = zahtjev.body;
    const upit = `INSERT INTO tjedni_zadaci (naslov, opis, korisnik_id) VALUES($naslov, $opis, $id)`;
    const vrijednosti = {
      $naslov: zadatak.naslov,
      $opis: zadatak.opis,
      $id: id
    }
    try {
      const rezultat = await BP.izvrsi(upit,vrijednosti);
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

exports.izbrisiTjedniZadatak = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const id = zahtjev.body.id;
    const prviUpit = `DELETE FROM tjedni_podaci WHERE zadatak_id = $id`;
    const drugiUpit = `DELETE FROM tjedni_zadaci WHERE id = $id`;
    const vrijednosti = {
      $id: id
    };
    try {
      await BP.izvrsi(prviUpit, vrijednosti);
      await BP.izvrsi(drugiUpit, vrijednosti);
      odgovor.status(204).json();
    } catch (error) {
      odgovor.status(500).json({ message: "Greška prilikom brisanja zadatka" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.dohvatiTjednePodatke = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const upit = `SELECT * FROM tjedni_podaci WHERE korisnik_id = $id AND tjedan = $tjedan`;
    const vrijednosti = {
      $id: id,
      $tjedan: zahtjev.query.tjedan
    }
    const rezultat = await BP.dohvati(upit, vrijednosti);

    const podaci = rezultat.map((item) => ({
      id: parseInt(item.zadatak_id),
      postavljeno: item.postavljeno === 1,
    }));

    odgovor.json(podaci);
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.kreirajTjedniPodatak = async function (zahtjev, odgovor) {
  const id = zahtjev.params.id;
  if (pom.provjeriZahtjev(zahtjev)) {
    const podaci = zahtjev.body;
    const upit = `INSERT INTO tjedni_podaci (tjedan, postavljeno, zadatak_id, korisnik_id) VALUES($tjedan, 1, $idZadatka, $id)`;
    const vrijednosti = {
      $tjedan: podaci.tjedan,
      $idZadatka: podaci.idZadatka,
      $id: id
    }

    try {
      await BP.izvrsi(upit, vrijednosti);
      odgovor.status(201).json();
    } catch (error) {
      odgovor
        .status(500)
        .json({ message: "Greška prilikom kreiranja zadatka" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};

exports.izbrisiTjedniPodatak = async function (zahtjev, odgovor) {
  if (pom.provjeriZahtjev(zahtjev)) {
    const id = zahtjev.body.idZadatka;
    const upit = `DELETE FROM tjedni_podaci WHERE zadatak_id = $id AND tjedan = $tjedan`;
    const vrijednosti = {
      $id: id,
      $tjedan: zahtjev.body.tjedan
    }
    try {
      await BP.izvrsi(upit, vrijednosti);
      odgovor.status(204).json();
    } catch (error) {
      odgovor.status(500).json({ message: "Greška prilikom brisanja zadatka" });
    }
  } else {
    odgovor.status(401).json({ message: "Niste autorizirani" });
  }
};
