import { useEffect, useState } from 'react';
import './App.scss';
import Navigacija from './Komponente/Navigacija/Navigacija';
import Zaglavlje from './Komponente/Zaglavlje/Zaglavlje';
import DnevniZadaci from './Stranice/DnevniZadaci/DnevniZadaci';
import { Projekt } from './Stranice/Projekt/Projekt';
import Projekti from './Stranice/Projekti/Projekti';
import TjedniZadaci from './Stranice/TjedniZadaci/TjedniZadaci';
import { TrajniZadaci } from './Stranice/TrajniZadaci/TrajniZadaci';
import { Route, Routes } from 'react-router-dom';
import { brisanjeProjekta, dohvatiKategorijeBiljeski, dohvatiPopisProjekata, kreirajProjekt } from './PomocneFunkcije/server';
import Biljeske from './Stranice/Biljeske/Biljeske';

function App() {
  //TODO: napraviti dohvat projekata i kategorija biljeski tek nakon sto se korisnik prijavi / registrira
  //TODO: kreirati putanju za '/'

  const [projekti, setProjekti] = useState([]);
  const [kategorijeBiljeski, setKategorijeBiljeski] = useState([]);

  const dohvatiProjekte = async () => {
    const popisProjekata = await dohvatiPopisProjekata();
    setProjekti(popisProjekata);
  }

  const dodajProjekt = async (naziv) => {
    //TODO: umjesto noviProjekt koristiti kreiraniProjekt
    const kreiraniProjekt = await kreirajProjekt(naziv);
    const noviProjekt = {
      id: projekti.length + 1,
      naziv: naziv
    };
    setProjekti([...projekti, noviProjekt]);
    console.log(projekti)
  }

  const obrisiProjekt = async (id) => {
    brisanjeProjekta(id);
    const noviProjekti = projekti.filter(projekt => projekt.id !== id);
    setProjekti(noviProjekti);
  }

  const dohvatiPopisKategorija = async () => {
    const popisKategorija = await dohvatiKategorijeBiljeski();
    setKategorijeBiljeski(popisKategorija);
  }
  
  useEffect(() => {
    const asinkroniDohvat = async () => {
      await dohvatiProjekte();
      await dohvatiPopisKategorija();
    };

    asinkroniDohvat();
  }, []);

  return (
    <>
      <Zaglavlje className='zaglavlje' />
      <Navigacija className='navigacija' popisProjekata={projekti} popisKategorija={kategorijeBiljeski} />
      <main className='stranica'>
        <Routes>
          <Route path="/trajni-zadaci" element={<TrajniZadaci />}/>
          <Route path="/tjedni-zadaci" element={<TjedniZadaci />}/>
          <Route path="/dnevni-zadaci" element={<DnevniZadaci />}/>
          <Route path="/projekti" element={<Projekti popisProjekata={projekti} dodajProjekt={dodajProjekt} obrisiProjekt={obrisiProjekt} />}/>
          <Route path="/projekti/:id" element={<Projekt />} />
          <Route path="/biljeske" element={<Biljeske />} />

        </Routes>
      </main>
    </>
  );
}

export default App;