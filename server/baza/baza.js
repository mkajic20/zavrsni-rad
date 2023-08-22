const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./baza.sqlite');

exports.izvrsi = async function(sql){
    db.exec(sql,(greska) => {
        console.log(greska);
    })
}

exports.dohvati = async function(sql){
    return new Promise((uspjeh, greska) => {
        db.all(sql, (gr, rez) => {
            if(gr)
            greska(gr);
            else {
            uspjeh(rez);
            }
        })
    })
}


