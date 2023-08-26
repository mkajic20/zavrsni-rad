import React, { useEffect, useState } from "react";
import "./TjedniZadaci.scss";
import Gumb from "../../Komponente/Gumb/Gumb";
import { formatirajDatum } from "../../PomocneFunkcije/datum";
import Stavka from "../../Komponente/Stavka/Stavka";
import {
  dohvatiTjednePodatke,
  dohvatiTjedneZadatke,
  kreirajTjedniZadatak,
  obrisiTjedniZadatak,
  promijeniStanjeTjednogZadatka,
} from "../../PomocneFunkcije/tjedniZadaci";
import ProzorKreiranje from "../../Komponente/ProzorKreiranje/ProzorKreiranje";
import PotvrdniProzor from "../../Komponente/PotvrdniProzor/PotvrdniProzor";

const TjedniZadaci = () => {
  const [tjedan, setTjedan] = useState(null);
  const [trenutniTjedan, setTrenutniTjedan] = useState(null);
  const [pocetakTjedna, setPocetakTjedna] = useState(null);
  const [zadaci, setZadaci] = useState([]);
  const [zadaciUcitavanje, setZadaciUcitavanje] = useState(true);
  const [dodavanje, setDodavanje] = useState(false);
  const [brisanje, setBrisanje] = useState(false);
  const [zadatakZaBrisanje, setZadatakZaBrisanje] = useState(null);
  const [spremljeniZadaci, setSpremljeniZadaci] = useState([]);

  const dohvatiTjedan = async () => {
    const trenutniDatum = new Date();
    const trenutniDan = trenutniDatum.getDay();

    const doPonedjeljka = trenutniDan === 0 ? 6 : trenutniDan - 1;
    const pocetakTjedna = new Date(trenutniDatum);
    pocetakTjedna.setDate(trenutniDatum.getDate() - doPonedjeljka);

    const doNedjelje = 6 - doPonedjeljka;
    const krajTjedna = new Date(trenutniDatum);
    krajTjedna.setDate(trenutniDatum.getDate() + doNedjelje);

    const trenutniTjedan = `${formatirajDatum(
      pocetakTjedna
    )} - ${formatirajDatum(krajTjedna)}`;

    setTrenutniTjedan(trenutniTjedan);
    setTjedan(trenutniTjedan);
    setPocetakTjedna(pocetakTjedna);

    await dohvatiPodatkeZaTjedan(trenutniTjedan);
  };

  const postaviPrethodniTjedan = async () => {
    const pocetakPrethodnogTjedna = new Date(pocetakTjedna);
    pocetakPrethodnogTjedna.setDate(pocetakPrethodnogTjedna.getDate() - 7);

    const krajPrethodnogTjedna = new Date(pocetakPrethodnogTjedna);
    krajPrethodnogTjedna.setDate(krajPrethodnogTjedna.getDate() + 6);

    const prethodniTjedan = `${formatirajDatum(
      pocetakPrethodnogTjedna
    )} - ${formatirajDatum(krajPrethodnogTjedna)}`;
    setTjedan(prethodniTjedan);
    setPocetakTjedna(pocetakPrethodnogTjedna);
    await dohvatiPodatkeZaTjedan(prethodniTjedan);
  };

  const postaviSljedeciTjedan = async () => {
    const pocetakSljedecegTjedna = new Date(pocetakTjedna);
    pocetakSljedecegTjedna.setDate(pocetakSljedecegTjedna.getDate() + 7);

    const krajSljedecegTjedna = new Date(pocetakSljedecegTjedna);
    krajSljedecegTjedna.setDate(krajSljedecegTjedna.getDate() + 6);

    const sljedeciTjedan = `${formatirajDatum(
      pocetakSljedecegTjedna
    )} - ${formatirajDatum(krajSljedecegTjedna)}`;
    setTjedan(sljedeciTjedan);
    setPocetakTjedna(pocetakSljedecegTjedna);
    await dohvatiPodatkeZaTjedan(sljedeciTjedan);
  };

  const dohvatiZadatke = async () => {
    const popisZadataka = await dohvatiTjedneZadatke();
    setZadaci(popisZadataka);
    setZadaciUcitavanje(false);
  };

  const dohvatiPodatkeZaTjedan = async (tjedan) => {
    const spremljeniZadatak = spremljeniZadaci.find(
      (zadatak) => zadatak.tjedan === tjedan
    );

    if (!spremljeniZadatak) {
      const podaci = await dohvatiTjednePodatke(tjedan);
      let azuriraniZadaci;

      if (podaci !== null) {
        azuriraniZadaci = zadaci.map((zadatak) => {
          const podatakZaZadatak = podaci.find(
            (podatak) => podatak.id === zadatak.id
          );
          if (podatakZaZadatak) {
            return { ...zadatak, zavrsen: podatakZaZadatak.postavljeno };
          } else {
            return { ...zadatak, zavrsen: false };
          }
        });
      } else {
        azuriraniZadaci = zadaci.map((zadatak) => ({
          ...zadatak,
          zavrsen: false,
        }));
      }

      const noviPodaci = {
        tjedan: tjedan,
        podaci: azuriraniZadaci,
      };
      setSpremljeniZadaci((stariZadaci) => [...stariZadaci, noviPodaci]);
    }
  };

  const promijeniStanjeZadatka = async (id, zavrsen) => {
    await promijeniStanjeTjednogZadatka(id, zavrsen, tjedan);
  };

  const kreirajZadatak = async (naslov, opis) => {
    //TODO: umjesto noviZadatak koristiti kreiraniZadatak nakon implmenetacije na serveru
    //TODO: dohvaceni zadatak nece imati zavrsen: false, to treba dodati u ovoj funkciji
    //kada se zadatak dodaje u varijablu zadaci onda se ne dodaje false, kada se dodaje u spremljeni zadaci onda se dodaje
    const kreiraniZadatak = await kreirajTjedniZadatak(naslov, opis);

    const noviZadatak = {
      id: zadaci.length + 2,
      naslov: naslov,
      opis: opis,
      zavrsen: false,
    };

    const azuriraniSpremljeniZadaci = spremljeniZadaci.map((spremljeni) => {
      return {
        ...spremljeni,
        podaci: [...spremljeni.podaci, noviZadatak],
      };
    });

    setZadaci((stariZadaci) => [...stariZadaci, noviZadatak]);
    setSpremljeniZadaci(azuriraniSpremljeniZadaci);
    setDodavanje(false);
  };

  const obrisiZadatak = () => {
    const id = zadatakZaBrisanje;
    obrisiTjedniZadatak(id);

    const azuriraniZadaci = zadaci.filter((zadatak) => zadatak.id !== id);
    const azuriraniSpremljeniZadaci = spremljeniZadaci.map((spremljeni) => ({
      ...spremljeni,
      podaci: spremljeni.podaci.filter((zadatak) => zadatak.id !== id),
    }));

    setZadaci(azuriraniZadaci);
    setSpremljeniZadaci(azuriraniSpremljeniZadaci);
    setBrisanje(false);
  };

  useEffect(() => {
    const asinkroniDohvat = async () => {
      await dohvatiZadatke();
    };

    asinkroniDohvat();
  }, []);

  useEffect(() => {
    const asinkroniDohvat = async () => {
      if (!zadaciUcitavanje) {
        await dohvatiTjedan();
      }
    };

    asinkroniDohvat();
  }, [zadaciUcitavanje]);

  return (
    <>
      <h1>Tjedni zadaci</h1>
      <div className="gumb-dodaj">
        <Gumb tekst="Dodaj novi" poziv={() => setDodavanje(true)} />
      </div>
      <div className="tjedan">
        <div>
          <Gumb tekst={"<"} poziv={postaviPrethodniTjedan} />
        </div>
        <p className="tjedan-tekst">{tjedan}</p>
        <div>
          <Gumb
            tekst={">"}
            poziv={postaviSljedeciTjedan}
            iskljucen={trenutniTjedan === tjedan}
          />
        </div>
      </div>

      <div className="tjedni-zadaci">
        {spremljeniZadaci
          .filter((spremljeni) => spremljeni.tjedan === tjedan)
          .map((spremljeni) =>
            spremljeni.podaci.map((zadatak) => (
              <Stavka
                key={zadatak.id}
                naslov={zadatak.naslov}
                opis={zadatak.opis}
                zavrsen={zadatak.zavrsen}
                promijeniStanje={() => {
                  const azuriraniZadaci = spremljeniZadaci.map(
                    (spremljeniTjedan) =>
                      spremljeniTjedan.tjedan === tjedan
                        ? {
                            ...spremljeniTjedan,
                            podaci: spremljeniTjedan.podaci.map((podatak) =>
                              podatak.id === zadatak.id
                                ? { ...podatak, zavrsen: !podatak.zavrsen }
                                : podatak
                            ),
                          }
                        : spremljeniTjedan
                  );
                  setSpremljeniZadaci(azuriraniZadaci);
                  promijeniStanjeZadatka(zadatak.id, !zadatak.zavrsen);
                }}
                brisanje={() => {
                  setBrisanje(true);
                  setZadatakZaBrisanje(zadatak.id);
                }}
              />
            ))
          )}
      </div>

      {dodavanje && (
        <ProzorKreiranje
          odustani={() => {
            setDodavanje(false);
          }}
          kreiraj={kreirajZadatak}
        />
      )}

      {brisanje && (
        <PotvrdniProzor
          tekst="Želite li obrisati zadatak?"
          odustani={() => {
            setBrisanje(false);
          }}
          potvrdi={obrisiZadatak}
        />
      )}
    </>
  );
};

export default TjedniZadaci;
