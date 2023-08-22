const express = require("express");
const server = express();
const port = 5000;
const korisnici = require("./DAO/korisnikDAO.js");

server.listen(port, async () => {

    server.use(express.json()); 

    posluziAplikaciju();
    postaviPutanje();
    console.log(`Server pokrenut na portu: ${port}`);
});

function posluziAplikaciju() {
  server.use("/", express.static("./aplikacija"));
}

function postaviPutanje() {
    server.post('/api/prijava', korisnici.prijava);
}