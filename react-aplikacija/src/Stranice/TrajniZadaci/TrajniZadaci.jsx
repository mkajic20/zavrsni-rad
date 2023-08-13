import React, { useEffect, useState } from 'react'
import './TrajniZadaci.scss';
import Odjeljak from '../../Komponente/Odjeljak/Odjeljak'
import Stavka from '../../Komponente/Stavka/Stavka'
import Gumb from '../../Komponente/Gumb/Gumb';
import ProzorKreiranje from '../../Komponente/ProzorKreiranje/ProzorKreiranje';
import PotvrdniProzor from '../../Komponente/PotvrdniProzor/PotvrdniProzor';
import { dohvatiTrajneZadatke, kreirajTrajniZadatak, obrisiTrajniZadatak, promijeniStanjeTrajnogZadatka } from '../../PomocneFunkcije/server';

export const TrajniZadaci = () => {
  const [zavrseniZadaci, setZavrseniZadaci] = useState([]);
  const [nezavrseniZadaci, setNezavrseniZadaci] = useState([]);
  const [dodavanje, setDodavanje] = useState(false);
  const [brisanje, setBrisanje] = useState(false);
  const [zadatakZaBrisanje, setZadatakZaBrisanje] = useState(null);


  const ucitajZadatke = async () => {

    const zadaci = await dohvatiTrajneZadatke();
    const zavrseniZadaci = zadaci.filter((zadatak) => zadatak.zavrsen);
    const nezavrseniZadaci = zadaci.filter((zadatak) => !zadatak.zavrsen);

    setZavrseniZadaci(zavrseniZadaci);
    setNezavrseniZadaci(nezavrseniZadaci);  
  }

  const promijeniStanje = async (id, novoStanje) => {
    console.log("poziv");

    await promijeniStanjeTrajnogZadatka(id, novoStanje);

    const azuriraniZadaci = zavrseniZadaci
      .concat(nezavrseniZadaci)
      .map((zadatak) => {
        if (zadatak.id === id) {
          return { ...zadatak, zavrsen: novoStanje };
        }
        return zadatak;
      });

    const azuriraniZavrseniZadaci = azuriraniZadaci.filter((zadatak) => zadatak.zavrsen);
    const azuriraniNezavrseniZadaci = azuriraniZadaci.filter((zadatak) => !zadatak.zavrsen);

    setZavrseniZadaci(azuriraniZavrseniZadaci);
    setNezavrseniZadaci(azuriraniNezavrseniZadaci);
  };

  const kreirajZadatak = async (naslov, opis) => {

    //TODO: umjesto noviZadatak koristiti kreiraniZadatak nakon implmenetacije na serveru
    //TODO: dohvaceni zadatak nece imati zavrsen: false, to treba dodati u ovoj funkciji
    //kada se zadatak dodaje u varijablu zadaci onda se ne dodaje false, kada se dodaje u spremljeni zadaci onda se dodaje
    
    const kreiraniZadatak = await kreirajTrajniZadatak(naslov, opis);

    const noviZadatak = {
      id: zavrseniZadaci.length + nezavrseniZadaci.length + 1,
      naslov: naslov,
      opis: opis,
      zavrsen: false,
    };
  
    setNezavrseniZadaci((stariNezavrseniZadaci) => [...stariNezavrseniZadaci, noviZadatak]);
    setDodavanje(false);
  }

  const obrisiZadatak = async () => {
    const id = zadatakZaBrisanje;

    await obrisiTrajniZadatak(id);
    
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

  useEffect(() => {
    const asinkroniDohvat = async () => {
      await ucitajZadatke();
    };

    asinkroniDohvat();
  }, []);


  return (
    <>
      <h1>Trajni zadaci</h1>
      <div className='gumb-dodaj'>
        <Gumb tekst="Novi zadatak" poziv={() => setDodavanje(true)}/>
      </div>
      <div className='zadaci'>
        <Odjeljak naslov='Nezavršeni'>
        {nezavrseniZadaci.map((zadatak) => (
          <Stavka
            key={zadatak.id}
            naslov={zadatak.naslov}
            opis={zadatak.opis}
            zavrsen={zadatak.zavrsen}
            promijeniStanje={() => promijeniStanje(zadatak.id, !zadatak.zavrsen)}
            brisanje={() => {
              setBrisanje(true); 
              setZadatakZaBrisanje(zadatak.id);
            }}
          />
        ))}
      </Odjeljak>

      <Odjeljak naslov='Završeni'>
        {zavrseniZadaci.map((zadatak) => (
          <Stavka
            key={zadatak.id}
            naslov={zadatak.naslov}
            opis={zadatak.opis}
            zavrsen={zadatak.zavrsen}
            promijeniStanje={() => promijeniStanje(zadatak.id, !zadatak.zavrsen)}
            brisanje={() => {
              setBrisanje(true); 
              setZadatakZaBrisanje(zadatak.id);
            }}
          />
        ))}
      </Odjeljak>
      </div>

      {dodavanje && <ProzorKreiranje naslov="Novi zadatak" odustani={() => {setDodavanje(false)}} kreiraj={kreirajZadatak}/>}
      {brisanje && 
      <PotvrdniProzor 
        tekst="Želite li obrisati zadatak?" 
        odustani={() => {setBrisanje(false)}} 
        potvrdi={obrisiZadatak}/>}
    </>
  )
}