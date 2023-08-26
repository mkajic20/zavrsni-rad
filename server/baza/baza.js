const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./baza/baza.sqlite");

// exports.izvrsi = function (sql) {
//   return new Promise((resolve, reject) => {
//     db.run(sql, function (greska) {
//       if (greska) {
//         console.error(greska);
//         reject(greska);
//       } else {
//         resolve(this);
//       }
//     });
//   });
// };

// exports.dohvati = async function (sql) {
//   return new Promise((uspjeh, greska) => {
//     db.all(sql, (gr, rez) => {
//       if (gr) greska(gr);
//       else {
//         uspjeh(rez);
//       }
//     });
//   });
// };

exports.izvrsi = function (sql, values) {
  return new Promise((resolve, reject) => {
    db.run(sql, values, function (greska) {
      if (greska) {
        console.error(greska);
        reject(greska);
      } else {
        resolve(this);
      }
    });
  });
};

exports.dohvati = async function (sql, values) {
  return new Promise((uspjeh, greska) => {
    db.all(sql, values, (gr, rez) => {
      if (gr) greska(gr);
      else {
        uspjeh(rez);
      }
    });
  });
};