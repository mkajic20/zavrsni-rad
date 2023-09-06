import React, { useEffect, useState } from "react";
import Odjeljak from "../../Komponente/Odjeljak/Odjeljak";
import "./TjedniPregled.scss";
import Stavka from "../../Komponente/Stavka/Stavka";
import ProjektniZadatak from "../../Komponente/ProjektniZadatak/ProjektniZadatak";
import { formatirajDatum } from "../../PomocneFunkcije/datum";
import Gumb from "../../Komponente/Gumb/Gumb";
import {
  dohvatiTjednePodatke,
  dohvatiTjedneZadatke,
  promijeniStanjeTjednogZadatka,
} from "../../PomocneFunkcije/tjedniZadaci";
import { dohvatiDnevnePodatkeKorisnika, dohvatiDnevneZadatke, promijeniStanjeDnevnogZadatka } from "../../PomocneFunkcije/dnevniZadaci";
import { dohvatiProjektneZadatkeKorisnika } from "../../PomocneFunkcije/projekti";
import { useNavigate } from "react-router-dom";


export const TjedniPregled = () => {

  const navigacija = useNavigate();

  const [tjedan, setTjedan] = useState(null);
  const [trenutniTjedan, setTrenutniTjedan] = useState(null);
  const [pocetakTjedna, setPocetakTjedna] = useState(null);
  const [zadaci, setZadaci] = useState([]);
  const [spremljeniZadaci, setSpremljeniZadaci] = useState([]);
  const [zadaciUcitavanje, setZadaciUcitavanje] = useState(true);

  const [danasnjiDan, setDanasnjiDan] = useState(null);

  const [dnevniZadaci, setDnevniZadaci] = useState([]);
  const [dnevniPodaci, setDnevniPodaci] = useState([]);

  const [spremljeniDnevniPodaci, setSpremljeniDnevniPodaci] = useState([]);
  
  const [projektniZadaci, setProjektniZadaci] = useState([]);


  const [dani, setDani] = useState([
    {dan: "Ponedjeljak", datum: '', proteklo: false},
    {dan: "Utorak", datum: '', proteklo: false},
    {dan: "Srijeda", datum: '', proteklo: false},
    {dan: "Četvrtak", datum: '', proteklo: false},
    {dan: "Petak", datum: '', proteklo: false},
    {dan: "Subota", datum: '', proteklo: false},
    {dan: "Nedjelja", datum: '', proteklo: false},
]);

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

    postaviDatumeDana(pocetakTjedna);

    setTrenutniTjedan(trenutniTjedan);
    setTjedan(trenutniTjedan);
    setPocetakTjedna(pocetakTjedna);

    await dohvatiPodatkeZaTjedan(trenutniTjedan);
  };

  const postaviDatumeDana = (pocetak) => {
    const formatiraniDatumi = [...dani]; 
    const noviSpremljeniDnevniZadaci = [];
    setSpremljeniDnevniPodaci([]);

    
    
    for (let i = 0; i < formatiraniDatumi.length; i++) {
        const datum = new Date(pocetak);
        datum.setDate(pocetak.getDate() + i);
        datum.setHours(0, 0, 0, 0);
        formatiraniDatumi[i].datum = formatirajDatum(datum);
        formatiraniDatumi[i].proteklo = datum <= danasnjiDan;

        const noviDnevniZadatak = {
            datum: formatirajDatum(datum),
            zadaci: dnevniZadaci.map((zadatak) => {
              const dnevniPodatak = dnevniPodaci.find(
                (podatak) =>
                  podatak.datum === formatirajDatum(datum) &&
                  podatak.zadatak_id == zadatak.id &&
                  podatak.postavljeno === 1
              );
              return {
                ...zadatak,
                zavrsen: !!dnevniPodatak,
              };
            }),
          }; 
        noviSpremljeniDnevniZadaci.push(noviDnevniZadatak);

    }
    setDani(formatiraniDatumi);    
    setSpremljeniDnevniPodaci(noviSpremljeniDnevniZadaci);  
  }

  const dohvatiPopisDnevnihZadataka = async () => {
    const popisZadataka = await dohvatiDnevneZadatke();
    const podaci = await dohvatiDnevnePodatkeKorisnika();
    setDnevniZadaci(popisZadataka);
    setDnevniPodaci(podaci);
  };

  const postaviPrethodniTjedan = async () => {
    const pocetakPrethodnogTjedna = new Date(pocetakTjedna);
    pocetakPrethodnogTjedna.setDate(pocetakPrethodnogTjedna.getDate() - 7);

    const krajPrethodnogTjedna = new Date(pocetakPrethodnogTjedna);
    krajPrethodnogTjedna.setDate(krajPrethodnogTjedna.getDate() + 6);

    const prethodniTjedan = `${formatirajDatum(
      pocetakPrethodnogTjedna
    )} - ${formatirajDatum(krajPrethodnogTjedna)}`;

    postaviDatumeDana(pocetakPrethodnogTjedna);
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

    postaviDatumeDana(pocetakSljedecegTjedna);
    setTjedan(sljedeciTjedan);
    setPocetakTjedna(pocetakSljedecegTjedna);
    await dohvatiPodatkeZaTjedan(sljedeciTjedan);
  };

  const dohvatiZadatkeTjedna = async () => {
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

  const azurirajDnevniZadatak = async (datum, id, zavrsen) => {
    await promijeniStanjeDnevnogZadatka(id, zavrsen, datum);

    const azuriraniPodaci = spremljeniDnevniPodaci.map((dnevniPodatak) => {
      if (dnevniPodatak.datum === datum) {
        dnevniPodatak.zadaci.map((zadatak) => {
          if (zadatak.id === id) {
            zadatak.zavrsen = zavrsen;
          }
          return zadatak;
        });
      }
      return dnevniPodatak;
    });

    const noviDnevniPodatak = {
      id: dnevniPodaci.length + 1,
      datum: datum, 
      zadatak_id: id.toString(), 
      postavljeno: zavrsen ? 1 : 0
    }

    setDnevniPodaci((stariPodaci) => [...stariPodaci, noviDnevniPodatak]);
    setSpremljeniDnevniPodaci(azuriraniPodaci);
  }

  useEffect(() => {
    const asinkroniDohvat = async () => {
      await dohvatiPopisDnevnihZadataka();
      await dohvatiZadatkeTjedna();
      setProjektniZadaci(await dohvatiProjektneZadatkeKorisnika())
    };

    asinkroniDohvat();
    const trenutniDatum = new Date();
    trenutniDatum.setHours(0, 0, 0, 0);
    setDanasnjiDan(trenutniDatum);
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
      <h1>Tjedni pregled</h1>

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

      <div className="tjedni-pregled-omotac">
        <Odjeljak naslov="Tjedni zadaci" sekundarni>
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
                  bezBrisanja={true}
                />
              ))
            )}
        </Odjeljak>

        {dani.map((dan) => (
          <Odjeljak key={dan.dan} naslov={dan.dan} sekundarni > 


            {spremljeniDnevniPodaci
            .filter((dnevniPodatak) => dnevniPodatak.datum === dan.datum)
            .map((dnevniPodatak) =>
                dnevniPodatak.zadaci.map((zadatak) => (
                <Stavka
                    key={`${dan.dan} ${zadatak.id}`}
                    naslov={zadatak.naslov}
                    opis={zadatak.opis}
                    zavrsen={zadatak.zavrsen}
                    bezBrisanja={true}
                    bezPotvrdnogOkvira={!dan.proteklo}
                    promijeniStanje={() => {
                      azurirajDnevniZadatak(dnevniPodatak.datum, zadatak.id, !zadatak.zavrsen);
                    }}
                />
                ))
            )}

            {projektniZadaci
            .filter((pz) => pz.datum_zavrsetka === dan.datum)
            .map((pz) => 
              <ProjektniZadatak
                key={pz.id}
                naslov={pz.naslov}
                opis={pz.opis}
                prikazanoDesno={false}
                prikazanoLijevo={false}
                klikPoziv={() => {navigacija(`/projekti/${pz.id}`)}}
                sekundarni
              />
            )}
                
          </Odjeljak>
        ))}
      </div>
    </>
  );
};
