const express = require("express");
const path = require("path");
const server = express();
const port = 5000;
const korisnici = require("./DAO/korisnikDAO.js");
const zadaci = require("./DAO/zadatakDAO.js");
const projekti = require("./DAO/projektDAO.js");
const biljeske = require("./DAO/biljeskaDAO.js");

server.listen(port, async () => {
  server.use(express.json());

  postaviPutanje();
  posluziAplikaciju();

  console.log(`Server pokrenut na portu: ${port}`);
});

function posluziAplikaciju() {
  server.use("/", express.static(path.join(__dirname, "aplikacija")));

  server.get("*", (zahtjev, odgovor) => {
    odgovor.sendFile(path.join(__dirname, "aplikacija", "index.html"));
  });
}

function postaviPutanje() {
  server.post('/api/korisnici/prijava', korisnici.prijava);
  server.post('/api/korisnici/registracija', korisnici.registracija);

  server.get('/api/zadaci/trajni-zadaci/:id', zadaci.dohvatiTrajneZadatke);
  server.post('/api/zadaci/trajni-zadaci/:id', zadaci.kreirajTrajniZadatak);
  server.put('/api/zadaci/trajni-zadaci/:id', zadaci.azurirajTrajniZadatak);
  server.delete('/api/zadaci/trajni-zadaci/:id', zadaci.izbrisiTrajniZadatak);

  server.get('/api/zadaci/dnevni-zadaci/:id', zadaci.dohvatiDnevneZadatke);
  server.post('/api/zadaci/dnevni-zadaci/:id', zadaci.kreirajDnevniZadatak);
  server.delete('/api/zadaci/dnevni-zadaci/:id', zadaci.izbrisiDnevniZadatak);

  server.get('/api/zadaci/dnevni-podaci/:id', zadaci.dohvatiDnevnePodatke);
  server.post('/api/zadaci/dnevni-podaci/:id', zadaci.kreirajDnevniPodatak);
  server.delete('/api/zadaci/dnevni-podaci/:id', zadaci.izbrisiDnevniPodatak);
  server.get('/api/zadaci/dnevni-podaci/korisnik/:id', zadaci.dohvatiDnevnePodatkeKorisnika);

  server.get('/api/zadaci/tjedni-zadaci/:id', zadaci.dohvatiTjedneZadatke);
  server.post('/api/zadaci/tjedni-zadaci/:id', zadaci.kreirajTjedniZadatak);
  server.delete('/api/zadaci/tjedni-zadaci/:id', zadaci.izbrisiTjedniZadatak);

  server.get('/api/zadaci/tjedni-podaci/:id', zadaci.dohvatiTjednePodatke);
  server.post('/api/zadaci/tjedni-podaci/:id', zadaci.kreirajTjedniPodatak);
  server.delete('/api/zadaci/tjedni-podaci/:id', zadaci.izbrisiTjedniPodatak);

  server.get('/api/projekti/:id', projekti.dohvatiProjekte);
  server.post('/api/projekti/:id', projekti.kreirajProjekt);
  server.delete('/api/projekti/:id', projekti.obrisiProjekt);

  server.get('/api/projekti/stanja-zavrsenosti/:id', projekti.stanjaZavrsenosti);

  server.get('/api/projekt/:id', projekti.dohvatiProjekt);

  server.post('/api/projekt/projektni-zadaci/:id', projekti.kreirajProjektniZadatak);
  server.put('/api/projekt/projektni-zadaci/:id', projekti.azurirajProjektniZadatak);
  server.put('/api/projekt/projektni-zadaci/datum/:id', projekti.azurirajDatumProjektnogZadatka);

  server.get('/api/projekt/projektni-zadaci/:id', projekti.dohvatiProjektneZadatkeKorisnika);


  server.get('/api/biljeske/kategorije/:id', biljeske.dohvatiKategorije);
  server.post ('/api/biljeske/kategorije/:id', biljeske.kreirajKategoriju);

  server.get('/api/biljeske/:id', biljeske.dohvatiBiljeske);
  server.post('/api/biljeske/:id', biljeske.kreirajBiljesku);
  server.put('/api/biljeske/:id', biljeske.azurirajBiljesku);
  server.delete('/api/biljeske/:id', biljeske.obrisiBiljesku);


  server.get('/api/biljeska/:id', biljeske.dohvatiBiljesku);

  server.post('/api/biljeske/kategorije-biljeski/:id', biljeske.kreirajKategorijuBiljeske);
  server.delete('/api/biljeske/kategorije-biljeski/:id', biljeske.obrisiKategorijuBiljeske);

  server.get('/api/biljeske/favoriti/:id', biljeske.dohvatiBiljeskeFavorite);
}