import React, { useEffect, useState } from 'react'
import './TjedniZadaci.scss'
import Gumb from '../../Komponente/Gumb/Gumb'
import { formatirajDatum } from '../../PomocneFunkcije/datum';
import Zadatak from '../../Komponente/Zadatak/Zadatak';
import { dohvatiTjednePodatke } from '../../PomocneFunkcije/server';
import KreiranjeZadatka from '../../Komponente/KreiranjeZadatka/KreiranjeZadatka';
import PotvrdniProzor from '../../Komponente/PotvrdniProzor/PotvrdniProzor';

const TjedniZadaci = () => {
  const [tjedan, setTjedan] = useState(null);
  const [trenutniTjedan, setTrenutniTjedan] = useState(null);
  const [pocetakTjedna, setPocetakTjedna] = useState(null);
  const [zadaci, setZadaci] = useState([]);
  const [zadaciUcitavanje, setZadaciUcitavanje] = useState(true);
  const [dodavanje, setDodavanje] = useState(false);
  const [brisanje, setBrisanje] = useState(false);
  const [zadatakZaBrisanje, setZadatakZaBrisanje] = useState(null);


  const dohvatiTjedan = async () => {
    const trenutniDatum = new Date();
    const trenutniDan = trenutniDatum.getDay();

    const doPonedjeljka = trenutniDan === 0 ? 6 : trenutniDan - 1;
    const pocetakTjedna = new Date(trenutniDatum);
    pocetakTjedna.setDate(trenutniDatum.getDate() - doPonedjeljka);

    const doNedjelje = 6 - doPonedjeljka;
    const krajTjedna = new Date(trenutniDatum);
    krajTjedna.setDate(trenutniDatum.getDate() + doNedjelje);

    const trenutniTjedan = `${formatirajDatum(pocetakTjedna)} - ${formatirajDatum(krajTjedna)}`

    setTrenutniTjedan(trenutniTjedan);
    setTjedan(trenutniTjedan);
    setPocetakTjedna(pocetakTjedna);

    await dohvatiPodatkeZaTjedan(trenutniTjedan);
  }

  const postaviPrethodniTjedan = async () => {

    const pocetakPrethodnogTjedna = new Date(pocetakTjedna);
    pocetakPrethodnogTjedna.setDate(pocetakPrethodnogTjedna.getDate() - 7);

    const krajPrethodnogTjedna = new Date(pocetakPrethodnogTjedna);
    krajPrethodnogTjedna.setDate(krajPrethodnogTjedna.getDate() + 6);

    const prethodniTjedan = `${formatirajDatum(pocetakPrethodnogTjedna)} - ${formatirajDatum(krajPrethodnogTjedna)}`
    setTjedan(prethodniTjedan);
    setPocetakTjedna(pocetakPrethodnogTjedna);
    await dohvatiPodatkeZaTjedan(prethodniTjedan);
  };

  const postaviSljedeciTjedan = async () => {
    const pocetakSljedecegTjedna = new Date(pocetakTjedna);
    pocetakSljedecegTjedna.setDate(pocetakSljedecegTjedna.getDate() + 7);

    const krajSljedecegTjedna = new Date(pocetakSljedecegTjedna);
    krajSljedecegTjedna.setDate(krajSljedecegTjedna.getDate() + 6);

    const sljedeciTjedan = `${formatirajDatum(pocetakSljedecegTjedna)} - ${formatirajDatum(krajSljedecegTjedna)}`
    setTjedan(sljedeciTjedan);
    setPocetakTjedna(pocetakSljedecegTjedna);
    await dohvatiPodatkeZaTjedan(sljedeciTjedan);
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

  const dohvatiPodatkeZaTjedan = async (tjedan) => {
    //TODO: spremiti vec dohvacene podatke i napraviti provjeru da se ne dohvacaju podaci koji su vec dohvaceni
    const podaci = await dohvatiTjednePodatke(tjedan);
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
  }

  const promijeniStanjeZadatka = (id, zavrsen) => {
    //TODO: promijeniti stanje zadatka na serveru
    //koristeci id, stanje te varijablu tjedan
    //ako je zavrsen true, onda se mijenja stanje, a ako je false onda se brise 
  }

  const kreirajZadatak = (naslov, opis) => {

    //TODO: Kreirati zadatak na serveru
    //kod kreiranja odma treba dohvatiti kreirani zadatak, zato sto treba imati id

    const noviZadatak = {
      id: zadaci.length + 1,
      naslov: naslov,
      opis: opis,
      zavrsen: false,
    };
  
    setZadaci((stariZadaci) => [...stariZadaci, noviZadatak]);
    setDodavanje(false);
  }

  const obrisiZadatak = () => {
    // TODO: Obrisati zadatak na serveru
    const id = zadatakZaBrisanje;
    const azuriraniZadaci = zadaci.filter((zadatak) => zadatak.id !== id);
    setZadaci(azuriraniZadaci);
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
      <div className='gumb-dodaj'>
        <Gumb tekst="Dodaj novi" poziv={() => setDodavanje(true)}/>
      </div>
      <div className='tjedan'>
        <div>
          <Gumb tekst={'<'} poziv={postaviPrethodniTjedan}/>
        </div>
        <p className='tjedan-tekst'>{tjedan}</p>
        <div>
          <Gumb tekst={'>'} poziv={postaviSljedeciTjedan} iskljucen={trenutniTjedan === tjedan}/>
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

export default TjedniZadaci