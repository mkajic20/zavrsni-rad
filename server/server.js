const express = require('/usr/local/lib/node_modules/express');
const server = express();
const port = 5000;

server.listen(port, () => {
    posluziAplikaciju();
    console.log(`Server pokrenut na portu: ${port}`);
});

function posluziAplikaciju(){
    server.use("/", express.static("./aplikacija"));
}