import React, { useState } from 'react'
import './TrajniZadaci.scss';
import Odjeljak from '../../Komponente/Odjeljak/Odjeljak'
import Zadatak from '../../Komponente/Zadatak/Zadatak'
import Gumb from '../../Komponente/Gumb/Gumb';
import KreiranjeZadatka from '../../Komponente/KreiranjeZadatka/KreiranjeZadatka';
import PotvrdniProzor from '../../Komponente/PotvrdniProzor/PotvrdniProzor';

export const TrajniZadaci = () => {
  const [zavrseniZadaci, setZavrseniZadaci] = useState([]);
  const [nezavrseniZadaci, setNezavrseniZadaci] = useState([]);
  const [dodavanje, setDodavanje] = useState(false);
  const [brisanje, setBrisanje] = useState(false);
  const [zadatakZaBrisanje, setZadatakZaBrisanje] = useState(null);


  const ucitajZadatke = () => {

    //TODO: Učitati zadatke sa servera

    const zadaci = 
    [{ id: 1, naslov: 'Zadatak 1', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 2, naslov: 'Zadatak 2', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 3, naslov: 'Zadatak 3', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 4, naslov: 'Zadatak 4', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 5, naslov: 'Zadatak 5', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 6, naslov: 'Zadatak 6', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 7, naslov: 'Zadatak 7', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 8, naslov: 'Zadatak 8', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 9, naslov: 'Zadatak 9', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 10, naslov: 'Zadatak 10', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 11, naslov: 'Zadatak 11', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 12, naslov: 'Zadatak 12', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 13, naslov: 'Zadatak 13', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 14, naslov: 'Zadatak 14', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 15, naslov: 'Zadatak 15', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 16, naslov: 'Zadatak 16', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},];

    const zavrseniZadaci = zadaci.filter((zadatak) => zadatak.zavrsen);
    const nezavrseniZadaci = zadaci.filter((zadatak) => !zadatak.zavrsen);

    setZavrseniZadaci(zavrseniZadaci);
    setNezavrseniZadaci(nezavrseniZadaci);  
  }

  const promijeniStanje = (id) => {

    //TODO: Promijeniti stanje zadatka na serveru

    const updatedZadaci = zavrseniZadaci
      .concat(nezavrseniZadaci)
      .map((zadatak) => {
        if (zadatak.id === id) {
          return { ...zadatak, zavrsen: !zadatak.zavrsen };
        }
        return zadatak;
      });

    const azuriraniZavrseniZadaci = updatedZadaci.filter((zadatak) => zadatak.zavrsen);
    const azuriraniNezavrseniZadaci = updatedZadaci.filter((zadatak) => !zadatak.zavrsen);

    setZavrseniZadaci(azuriraniZavrseniZadaci);
    setNezavrseniZadaci(azuriraniNezavrseniZadaci);
  };

  const kreirajZadatak = (naslov, opis) => {

    //TODO: Kreirati zadatak na serveru
    //kod kreiranja odma treba dohvatiti kreirani zadatak, zato sto treba imati id

    const noviZadatak = {
      id: zavrseniZadaci.length + nezavrseniZadaci.length + 1,
      naslov: naslov,
      opis: opis,
      zavrsen: false,
    };
  
    setNezavrseniZadaci((stariNezavrseniZadaci) => [...stariNezavrseniZadaci, noviZadatak]);
    setDodavanje(false);
  }

  const obrisiZadatak = () => {
    // TODO: Obrisati zadatak na serveru
    const id = zadatakZaBrisanje;
  
    const indeksZadatka = zavrseniZadaci.findIndex((zadatak) => zadatak.id === id);
    const zadatakZavrsen = indeksZadatka !== -1;
  
    if (zadatakZavrsen) {
      const azuriraniZavrseniZadaci = zavrseniZadaci.filter((zadatak) => zadatak.id !== id);
      setZavrseniZadaci(azuriraniZavrseniZadaci);
    } else {
      const azuriraniNezavrseniZadaci = nezavrseniZadaci.filter((zadatak) => zadatak.id !== id);
      setNezavrseniZadaci(azuriraniNezavrseniZadaci);
    }

    setBrisanje(false);
  };

  useState(ucitajZadatke);

  return (
    <>
      <h1>Trajni zadaci</h1>
      <div className='gumb-dodaj'>
        <Gumb tekst="Dodaj novi" poziv={() => setDodavanje(true)}/>
      </div>
      <div className='zadaci'>
        <Odjeljak naslov='Nezavršeni'>
        {nezavrseniZadaci.map((zadatak) => (
          <Zadatak
            key={zadatak.id}
            naslov={zadatak.naslov}
            opis={zadatak.opis}
            zavrsen={zadatak.zavrsen}
            promijeniStanje={() => promijeniStanje(zadatak.id)}
            brisanje={() => {
              setBrisanje(true); 
              setZadatakZaBrisanje(zadatak.id);
            }}
          />
        ))}
      </Odjeljak>

      <Odjeljak naslov='Završeni'>
        {zavrseniZadaci.map((zadatak) => (
          <Zadatak
            key={zadatak.id}
            naslov={zadatak.naslov}
            opis={zadatak.opis}
            zavrsen={zadatak.zavrsen}
            promijeniStanje={() => promijeniStanje(zadatak.id)}
            brisanje={() => {
              setBrisanje(true); 
              setZadatakZaBrisanje(zadatak.id);
            }}
          />
        ))}
      </Odjeljak>
      </div>

      {dodavanje && <KreiranjeZadatka odustani={() => {setDodavanje(false)}} kreiraj={kreirajZadatak}/>}
      {brisanje && 
      <PotvrdniProzor 
        tekst="Želite li obrisati zadatak?" 
        odustani={() => {setBrisanje(false)}} 
        potvrdi={obrisiZadatak}/>}
    </>
  )
}