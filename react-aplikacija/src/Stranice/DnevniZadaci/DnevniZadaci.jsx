import React, { useEffect, useState } from 'react'
import './DnevniZadaci.scss'
import Gumb from '../../Komponente/Gumb/Gumb'
import { formatirajDatum } from '../../PomocneFunkcije/datum';
import Stavka from '../../Komponente/Stavka/Stavka';
import { promijeniStanjeDnevnogZadatka, dohvatiDnevnePodatke, dohvatiDnevneZadatke, kreirajDnevniZadatak, obrisiDnevniZadatak } from '../../PomocneFunkcije/server';
import ProzorKreiranje from '../../Komponente/ProzorKreiranje/ProzorKreiranje';
import PotvrdniProzor from '../../Komponente/PotvrdniProzor/PotvrdniProzor';

const DnevniZadaci = () => {
  const [dan, setDan] = useState(null);
  const [trenutniDan, setTrenutniDan] = useState(null);
  const [zadaci, setZadaci] = useState([]);
  const [zadaciUcitavanje, setZadaciUcitavanje] = useState(true);
  const [dodavanje, setDodavanje] = useState(false);
  const [brisanje, setBrisanje] = useState(false);
  const [zadatakZaBrisanje, setZadatakZaBrisanje] = useState(null);
  const [spremljeniZadaci, setSpremljeniZadaci] = useState([]);

  const dohvatiDan = async () => {
    const trenutniDatum = formatirajDatum(new Date());
    setTrenutniDan(trenutniDatum);
    setDan(trenutniDatum);

    await dohvatiPodatkeZaDan(trenutniDatum);
  }

  const postaviPrethodniDan = async () => {
    //1 se oduzima mjesecu jer je mjesec u javascriptu indeksiran od 0, sto znaci da su dan i mjesec zamijenjeni
    const [danDatuma, mjesecDatuma, godinaDatuma] = dan.split('.');
    const prethodniDatum = new Date(godinaDatuma, mjesecDatuma - 1, danDatuma);
    prethodniDatum.setDate(prethodniDatum.getDate() - 1);
    const formatiraniPrethodniDatum = formatirajDatum(prethodniDatum);
    setDan(formatiraniPrethodniDatum);
    await dohvatiPodatkeZaDan(formatiraniPrethodniDatum);
  };
  
  const postaviSljedeciDan = async () => {
    //1 se oduzima mjesecu jer je mjesec u javascriptu indeksiran od 0, sto znaci da su dan i mjesec zamijenjeni
    const [danDatuma, mjesecDatuma, godinaDatuma] = dan.split('.');
    const sljedeciDatum = new Date(godinaDatuma, mjesecDatuma - 1, danDatuma);
    sljedeciDatum.setDate(sljedeciDatum.getDate() + 1);
    const formatiraniSljedeciDatum = formatirajDatum(sljedeciDatum);
    setDan(formatiraniSljedeciDatum);
    await dohvatiPodatkeZaDan(formatiraniSljedeciDatum);
  };
  
  const dohvatiZadatke = async () => {
    const popisZadataka = await dohvatiDnevneZadatke();
    setZadaci(popisZadataka);
    setZadaciUcitavanje(false);
  };

  const dohvatiPodatkeZaDan = async (dan) => {
    const spremljeniZadatak = spremljeniZadaci.find((zadatak) => zadatak.dan === dan);

    if (!spremljeniZadatak) {
      const podaci = await dohvatiDnevnePodatke(dan);
      let azuriraniZadaci;

      if (podaci !== null) {
        azuriraniZadaci = zadaci.map((zadatak) => {
          const podatakZaZadatak = podaci.find((podatak) => podatak.id === zadatak.id);
          if (podatakZaZadatak) {
            return { ...zadatak, zavrsen: podatakZaZadatak.postavljeno };
          } else {
            return { ...zadatak, zavrsen: false };
          }
        });
      } else {
        azuriraniZadaci = zadaci.map((zadatak) => ({ ...zadatak, zavrsen: false }));
      }

      const noviPodaci = {
        dan: dan,
        podaci: azuriraniZadaci
      };
      setSpremljeniZadaci((stariZadaci) => [...stariZadaci, noviPodaci]);
    }
  }

  const promijeniStanjeZadatka = (id, zavrsen) => {
    promijeniStanjeDnevnogZadatka(id, zavrsen, dan);
  }

  const kreirajZadatak = async (naslov, opis) => {

    //TODO: umjesto noviZadatak koristiti kreiraniZadatak nakon implmenetacije na serveru
    //TODO: dohvaceni zadatak nece imati zavrsen: false, to treba dodati u ovoj funkciji
    //kada se zadatak dodaje u varijablu zadaci onda se ne dodaje false, kada se dodaje u spremljeni zadaci onda se dodaje
    const kreiraniZadatak = await kreirajDnevniZadatak(naslov, opis);

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
  }

  const obrisiZadatak = async () => {
    const id = zadatakZaBrisanje;
    obrisiDnevniZadatak(id);

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
        await dohvatiDan();
      }
    };

    asinkroniDohvat();
  }, [zadaciUcitavanje]);


  return (
    <>
      <h1>Dnevni zadaci</h1>
      <div className='gumb-dodaj'>
        <Gumb tekst="Novi zadatak" poziv={() => setDodavanje(true)}/>
      </div>
      <div className='datum'>
        <div>
          <Gumb tekst={'<'} poziv={postaviPrethodniDan}/>
        </div>
        <p className='datum-tekst'>{dan}</p>
        <div>
          <Gumb tekst={'>'} poziv={postaviSljedeciDan} iskljucen={trenutniDan === dan}/>
        </div>
      </div>

      <div className='dnevni-zadaci'> 
        {spremljeniZadaci
          .filter((spremljeni) => spremljeni.dan === dan)
          .map((spremljeni) =>
            spremljeni.podaci.map((zadatak) => (
              <Stavka
                key={zadatak.id}
                naslov={zadatak.naslov}
                opis={zadatak.opis}
                zavrsen={zadatak.zavrsen}
                promijeniStanje={() => {
                  const azuriraniZadaci = spremljeniZadaci.map((spremljeniDan) =>
                    spremljeniDan.dan === dan
                      ? {
                          ...spremljeniDan,
                          podaci: spremljeniDan.podaci.map((podatak) =>
                            podatak.id === zadatak.id
                              ? { ...podatak, zavrsen: !podatak.zavrsen }
                              : podatak
                          ),
                        }
                      : spremljeniDan
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

      {dodavanje && <ProzorKreiranje naslov="Novi dnevni zadatak" odustani={() => {setDodavanje(false)}} kreiraj={kreirajZadatak}/>}

      {brisanje && 
      <PotvrdniProzor 
        tekst="Želite li obrisati zadatak?" 
        odustani={() => {setBrisanje(false)}} 
        potvrdi={obrisiZadatak}/>}

    </>
  )
}

export default DnevniZadaci