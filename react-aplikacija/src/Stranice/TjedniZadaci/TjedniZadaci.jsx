import React, { useState } from 'react'
import './TjedniZadaci.scss'
import Gumb from '../../Komponente/Gumb/Gumb'
import { formatirajDatum } from '../../PomocneFunkcije/datum';
import { c } from 'tar';

const TjedniZadaci = () => {
  const [tjedan, setTjedan] = useState(null);
  const [trenutniTjedan, setTrenutniTjedan] = useState(null);
  const [pocetakTjedna, setPocetakTjedna] = useState(null);
  const [zadaci, setZadaci] = useState([]);
  const [tjedniPodaci, setTjedniPodaci] = useState([]);

  const dohvatiTjedan = () => {
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

    dohvatiPodatkeZaTjedan(trenutniTjedan);
  }

  const postaviPrethodniTjedan = () => {

    const pocetakPrethodnogTjedna = new Date(pocetakTjedna);
    pocetakPrethodnogTjedna.setDate(pocetakPrethodnogTjedna.getDate() - 7);
    
    const krajPrethodnogTjedna = new Date(pocetakPrethodnogTjedna);
    krajPrethodnogTjedna.setDate(krajPrethodnogTjedna.getDate() + 6);
    
    const prethodniTjedan = `${formatirajDatum(pocetakPrethodnogTjedna)} - ${formatirajDatum(krajPrethodnogTjedna)}`
    setTjedan(prethodniTjedan);
    setPocetakTjedna(pocetakPrethodnogTjedna);
    dohvatiPodatkeZaTjedan(prethodniTjedan);
  };

  const postaviSljedeciTjedan = () => {
    const pocetakSljedecegTjedna = new Date(pocetakTjedna);
    pocetakSljedecegTjedna.setDate(pocetakSljedecegTjedna.getDate() + 7);
    
    const krajSljedecegTjedna = new Date(pocetakSljedecegTjedna);
    krajSljedecegTjedna.setDate(krajSljedecegTjedna.getDate() + 6);
    
    const sljedeciTjedan = `${formatirajDatum(pocetakSljedecegTjedna)} - ${formatirajDatum(krajSljedecegTjedna)}`
    setTjedan(sljedeciTjedan);
    setPocetakTjedna(pocetakSljedecegTjedna);
    dohvatiPodatkeZaTjedan(sljedeciTjedan);
  };

  const dohvatiZadatke = () => {
    //TODO: dohvatiti zadatke sa servera
    const zadaci = [
      {id: 1, naziv: 'Zadatak 1', opis: 'Opis 1'},
      {id: 2, naziv: 'Zadatak 2', opis: 'Opis 2'},
      {id: 3, naziv: 'Zadatak 3', opis: 'Opis 3'},
      {id: 4, naziv: 'Zadatak 4', opis: 'Opis 4'},
      {id: 5, naziv: 'Zadatak 5', opis: 'Opis 5'},
      {id: 6, naziv: 'Zadatak 6', opis: 'Opis 6'},
      {id: 7, naziv: 'Zadatak 7', opis: 'Opis 7'},
      {id: 8, naziv: 'Zadatak 8', opis: 'Opis 8'},
      {id: 9, naziv: 'Zadatak 9', opis: 'Opis 9'},
      {id: 10, naziv: 'Zadatak 10', opis: 'Opis 10'},
      {id: 11, naziv: 'Zadatak 11', opis: 'Opis 11'},
      {id: 12, naziv: 'Zadatak 12', opis: 'Opis 12'},
    ]
    setZadaci(zadaci);
  };

  const dohvatiPodatkeZaTjedan = (tjedan) => {
    let podaci;
    const pronadenTjedan = tjedniPodaci.find((podatak) => podatak.tjedan === tjedan);

    if (pronadenTjedan) {
      podaci =  pronadenTjedan.podaci;
    } else {
      //TODO: dohvatiti podatke sa servera, te ih vratiti i dodati u tjedniPodaci
    }


    const azuriraniZadaci = zadaci.map((zadatak) => {
      const podatakZaZadatak = podaci.find((podatak) => podatak.id === zadatak.id);
      if (podatakZaZadatak) {
        return { ...zadatak, zavrsen: podatakZaZadatak.postavljeno };
      } else {
        return { ...zadatak, zavrsen: false };
      }
    });

    setZadaci(azuriraniZadaci);

  }


  //BRISE SE KASNIJE
  //----------------------
  const postavljanjePodataka = () => {
    setTjedniPodaci([
      {tjedan: '07.08.2023 - 13.08.2023', podaci: [{id: 1, postavljeno: true}, {id: 5, postavljeno: true}, {id: 8, postavljeno: true}]},
      {tjedan: '31.07.2023 - 06.08.2023', podaci: [{id: 2, postavljeno: true}, {id: 6, postavljeno: true}, {id: 10, postavljeno: true}]},

    ]);
  }
  //----------------------
  
  
  useState(dohvatiZadatke);
  useState(dohvatiTjedan);

  postavljanjePodataka();

  return (
    <>
        <h1>Tjedni zadaci</h1>
        <div className='gumb-dodaj'>
            <Gumb tekst="Dodaj novi" poziv={() => {}}/>
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
    </>
  )
}

export default TjedniZadaci