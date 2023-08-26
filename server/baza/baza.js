const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./baza.sqlite");

exports.izvrsi = function (sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (greska) {
      if (greska) {
        console.error(greska);
        reject(greska);
      } else {
        resolve(this);
      }
    });
  });
};

exports.dohvati = async function (sql) {
  return new Promise((uspjeh, greska) => {
    db.all(sql, (gr, rez) => {
      if (gr) greska(gr);
      else {
        uspjeh(rez);
      }
    });
  });
};
