import React, { useEffect, useState } from 'react'
import './DnevniZadaci.scss'
import Gumb from '../../Komponente/Gumb/Gumb'
import { formatirajDatum } from '../../PomocneFunkcije/datum';
import Zadatak from '../../Komponente/Zadatak/Zadatak';
import { dohvatiDnevnePodatke } from '../../PomocneFunkcije/server';
import KreiranjeZadatka from '../../Komponente/KreiranjeZadatka/KreiranjeZadatka';
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

  //popravit kreiranje zadataka, trenutno se kreirani zadatak ne prikazuje ispravno na danima
  //popravit pocetno ucitavanje stranice, trenutno se ne ucitavaju stanja zadataka


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
    //TODO: dohvatiti zadatke sa servera
    //na serveru nece biti spremljen podatak zavrsen, vec ce to biti zasebna tablica, te se u ovoj funkciji treba dodati false na svaki zadatak
    // (zato sto se dohvaca koji je oznacen u drugoj funkciji, a ako se tu ne stavi false svuda dobije se greska)
    const zadaci = [
      {id: 1, naslov: 'Zadatak 1', opis: 'Opis 1', zavrsen: false},
      {id: 2, naslov: 'Zadatak 2', opis: 'Opis 2', zavrsen: false},
      {id: 3, naslov: 'Zadatak 3', opis: 'Opis 3', zavrsen: false},
      {id: 4, naslov: 'Zadatak 4', opis: 'Opis 4', zavrsen: false},
      {id: 5, naslov: 'Zadatak 5', opis: 'Opis 5', zavrsen: false},
      {id: 6, naslov: 'Zadatak 6', opis: 'Opis 6', zavrsen: false},
      {id: 7, naslov: 'Zadatak 7', opis: 'Opis 7', zavrsen: false},
      {id: 8, naslov: 'Zadatak 8', opis: 'Opis 8', zavrsen: false},
      {id: 9, naslov: 'Zadatak 9', opis: 'Opis 9', zavrsen: false},
      {id: 10, naslov: 'Zadatak 10', opis: 'Opis 10', zavrsen: false},
      {id: 11, naslov: 'Zadatak 11', opis: 'Opis 11', zavrsen: false},
      {id: 12, naslov: 'Zadatak 12', opis: 'Opis 12', zavrsen: false},
    ]
    setZadaci(zadaci);
    setZadaciUcitavanje(false);
  };

  const dohvatiPodatkeZaDan = async (dan) => {
    //TODO: spremiti vec dohvacene podatke i napraviti provjeru da se ne dohvacaju podaci koji su vec dohvaceni
    // console.log(zadaci);
    const spremljeniZadatak = spremljeniZadaci.find((zadatak) => zadatak.dan === dan);

    if (spremljeniZadatak) {
      setZadaci(spremljeniZadatak.podaci);
    } else {
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
      setZadaci(azuriraniZadaci);

      const noviPodaci = {
        dan: dan,
        podaci: azuriraniZadaci
      };
      setSpremljeniZadaci((stariZadaci) => [...stariZadaci, noviPodaci]);
    }
  }

  const promijeniStanjeZadatka = (id, zavrsen) => {
    //TODO: promijeniti stanje zadatka na serveru
    //koristeci id, stanje te varijablu dan
    //ako je zavrsen true, onda se mijenja stanje, a ako je false onda se brise 
  }

  const kreirajZadatak = (naslov, opis) => {

    //TODO: Kreirati zadatak na serveru
    //kod kreiranja odma treba dohvatiti kreirani zadatak, zato sto treba imati id

    const noviZadatak = {
      id: zadaci.length + 2,
      naslov: naslov,
      opis: opis,
      zavrsen: false,
    };
  
    //u varijabli spremljeniZadaci se bez ovog dijela ne doda novi zadatak za dan koji je trenutno odabran
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

  const obrisiZadatak = () => {
    // TODO: Obrisati zadatak na serveru
    const id = zadatakZaBrisanje;
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

      {zadaci.map((zadatak) => (
      <Zadatak
        key={zadatak.id}
        naslov={zadatak.naslov}
        opis={zadatak.opis}
        zavrsen={zadatak.zavrsen}
        promijeniStanje={() => {zadatak.zavrsen = !zadatak.zavrsen; setZadaci([...zadaci]); promijeniStanjeZadatka(zadatak.id, zadatak.zavrsen)}}
        brisanje={() => {
          setBrisanje(true); 
          setZadatakZaBrisanje(zadatak.id);
        }}
      />
      ))}

      {dodavanje && <KreiranjeZadatka odustani={() => {setDodavanje(false)}} kreiraj={kreirajZadatak}/>}

      {brisanje && 
      <PotvrdniProzor 
        tekst="Želite li obrisati zadatak?" 
        odustani={() => {setBrisanje(false)}} 
        potvrdi={obrisiZadatak}/>}

    </>
  )
}

export default DnevniZadaci