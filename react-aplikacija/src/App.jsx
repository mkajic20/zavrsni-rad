import { useEffect, useState } from 'react';
import './App.scss';
import Navigacija from './Komponente/Navigacija/Navigacija';
import Zaglavlje from './Komponente/Zaglavlje/Zaglavlje';
import DnevniZadaci from './Stranice/DnevniZadaci/DnevniZadaci';
import Projekti from './Stranice/Projekti/Projekti';
import TjedniZadaci from './Stranice/TjedniZadaci/TjedniZadaci';
import { TrajniZadaci } from './Stranice/TrajniZadaci/TrajniZadaci';
import { Route, Routes } from 'react-router-dom';
import { brisanjeProjekta, dohvatiBiljeskeFavorite, dohvatiPopisProjekata, kreirajProjekt } from './PomocneFunkcije/server';
import Biljeske from './Stranice/Biljeske/Biljeske';
import Projekt from './Stranice/Projekt/Projekt';
import Biljeska from './Stranice/Biljeska/Biljeska';

function App() {
  //TODO: napraviti dohvat projekata i kategorija biljeski tek nakon sto se korisnik prijavi / registrira
  //TODO: popraviti overflow

  const [projekti, setProjekti] = useState([]);
  const [favoriti, setFavoriti] = useState([]);

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

  const dohvatiPopisFavorita = async () => {
    const popisFavorita = await dohvatiBiljeskeFavorite();
    setFavoriti(popisFavorita);
  }

  const promijeniFavorit = (biljeska, novoStanje) => {
    if(novoStanje){
      setFavoriti(prevPopisFavorita => [...prevPopisFavorita, biljeska]); 
    } else {
      setFavoriti(prevPopisFavorita => prevPopisFavorita.filter(favorit => favorit.id !== biljeska.id));
    }
  }

  
  
  useEffect(() => {
    const asinkroniDohvat = async () => {
    await dohvatiProjekte();
    await dohvatiPopisFavorita();
  };

    asinkroniDohvat();
  }, []);

  return (
    <>
      <Zaglavlje className='zaglavlje' />
      <Navigacija className='navigacija' popisProjekata={projekti} popisFavorita={favoriti} />
      <main className='stranica'>
        <Routes>
          <Route path="/trajni-zadaci" element={<TrajniZadaci />}/>
          <Route path="/tjedni-zadaci" element={<TjedniZadaci />}/>
          <Route path="/dnevni-zadaci" element={<DnevniZadaci />}/>
          <Route path="/projekti" element={<Projekti popisProjekata={projekti} dodajProjekt={dodajProjekt} obrisiProjekt={obrisiProjekt} />}/>
          <Route path="/projekti/:id" element={<Projekt/>} />
          <Route path="/biljeske" element={<Biljeske favoritKlik={promijeniFavorit} />} />
          <Route path="/biljeske/:id" element={<Biljeska promijeniFavorita={promijeniFavorit}/>} />
        </Routes>
      </main>
    </>
  );
}

export default App;