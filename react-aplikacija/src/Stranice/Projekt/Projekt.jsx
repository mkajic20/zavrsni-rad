import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dohvatiProjekt, dohvatiStanjaZavrsenosti, kreirajProjektniZadatak } from '../../PomocneFunkcije/server';
import './Projekt.scss'
import Odjeljak from '../../Komponente/Odjeljak/Odjeljak';
import Stavka from '../../Komponente/Stavka/Stavka';
import Gumb from '../../Komponente/Gumb/Gumb';
import ProzorKreiranje from '../../Komponente/ProzorKreiranje/ProzorKreiranje';

const Projekt = () => {
  const [nazivProjekta, setNazivProjekta] = useState('');
  const [stanjaIzvrsenosti, setStanjaIzvrsenosti] = useState([]);
  const [zadaci, setZadaci] = useState([]);
  const [dodavanje, setDodavanje] = useState(false);

  //TODO: napraviti opciju promijene stanja zadatka

  const id = useParams().id;
  

  const dohvatProjekta = async () => {
    const projekt = await dohvatiProjekt(id);
    setNazivProjekta(projekt.naziv);
    setZadaci(projekt.zadaci);
  }

  const dohvatStanjaIzvrsenosti = async () => {
    const stanja = await dohvatiStanjaZavrsenosti(id);
    setStanjaIzvrsenosti(stanja);
  }

  const dodajZadatak = async (naslov, opis) => {
    const kreiraniZadatak = await kreirajProjektniZadatak(naslov, opis, 1);
    const noviZadatak = {
      id: zadaci.length + 1,
      naslov: naslov,
      opis: opis,
      stanje: 1
    };
    setZadaci([...zadaci, noviZadatak]);
    setDodavanje(false);
  }

  useEffect(() => {
    const asinkroniDohvat = async () => {
      await dohvatStanjaIzvrsenosti();
      await dohvatProjekta();
    };

    asinkroniDohvat();
  }, [id]);

  

  return (
    <>
      <h1>{nazivProjekta}</h1>
      <div className='projekt-omotac-gumba'>
        <Gumb tekst="Novi zadatak" poziv={() => {setDodavanje(true)}} />
        <Gumb tekst="Obrisi projekt" />
      </div>
      <div className='omotac-zadataka'>
        {stanjaIzvrsenosti.map((stanje) => (
          <Odjeljak naslov={stanje.naziv} sekundarni key={stanje.id}>
            {zadaci.filter(zadatak => zadatak.stanje == stanje.id).map((zadatak) => (
              <Stavka key={zadatak.id} naslov={zadatak.naslov} opis={zadatak.opis} bezPotvrdnogOkvira/>
            ))}
          </Odjeljak>
        ))}
      </div>

      {dodavanje && 
        <ProzorKreiranje naslov="Novi zadatak" zatvori={() => setDodavanje(false)} kreiraj={dodajZadatak} />
      }
    </>
  )
}

Projekt.propTypes = {
}

export default Projekt