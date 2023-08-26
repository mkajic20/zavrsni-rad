import { useEffect, useState } from "react";
import "./App.scss";
import Navigacija from "./Komponente/Navigacija/Navigacija";
import Zaglavlje from "./Komponente/Zaglavlje/Zaglavlje";
import DnevniZadaci from "./Stranice/DnevniZadaci/DnevniZadaci";
import Projekti from "./Stranice/Projekti/Projekti";
import TjedniZadaci from "./Stranice/TjedniZadaci/TjedniZadaci";
import { TrajniZadaci } from "./Stranice/TrajniZadaci/TrajniZadaci";
import { Route, Routes } from "react-router-dom";
import {
  provjeriKorisnika,
} from "./PomocneFunkcije/korisnici";
import {
  brisanjeProjekta,
  kreirajProjekt,
  dohvatiPopisProjekata
} from "./PomocneFunkcije/projekti";
import {
  dohvatiBiljeskeFavorite,
  promijeniFavorita
} from "./PomocneFunkcije/biljeske";
import Biljeske from "./Stranice/Biljeske/Biljeske";
import Projekt from "./Stranice/Projekt/Projekt";
import Biljeska from "./Stranice/Biljeska/Biljeska";
import Prijava from "./Stranice/Prijava/Prijava";
import Registracija from "./Stranice/Registracija/Registracija";
import ZasticenaPutanja from "./Komponente/ZasticenaPutanja/ZasticenaPutanja";

function App() {

  const [prijavljen, setPrijavljen] = useState(provjeriKorisnika() ? true : false,);
  const [projekti, setProjekti] = useState([]);
  const [favoriti, setFavoriti] = useState([]);

  const dohvatiProjekte = async () => {
    const popisProjekata = await dohvatiPopisProjekata();
    setProjekti(popisProjekata);
  };

  const dodajProjekt = async (naziv) => {
    const noviId = await kreirajProjekt(naziv);
    const noviProjekt = {
      id: noviId,
      naziv: naziv,
    };
    setProjekti([...projekti, noviProjekt]);
  };

  const obrisiProjekt = async (id) => {
    id = Number(id);
    brisanjeProjekta(id);
    const noviProjekti = projekti.filter((projekt) => projekt.id !== id);
    setProjekti(noviProjekti);
  };

  const dohvatiPopisFavorita = async () => {
    const popisFavorita = await dohvatiBiljeskeFavorite();
    setFavoriti(popisFavorita);
  };

  const promijeniFavorit = (biljeska, novoStanje) => {
    promijeniFavorita(biljeska.id, novoStanje);
    if (novoStanje) {
      setFavoriti((prevPopisFavorita) => [...prevPopisFavorita, biljeska]);
    } else {
      setFavoriti((prevPopisFavorita) =>
        prevPopisFavorita.filter((favorit) => favorit.id !== biljeska.id)
      );
    }
  };

  useEffect(() => {
    const asinkroniDohvat = async () => {
      if (prijavljen) {
        await dohvatiProjekte();
        await dohvatiPopisFavorita();
      }
    };

    asinkroniDohvat();
  }, [prijavljen]);


  return (
    <>
      {prijavljen && (
        <>
          <Zaglavlje className="zaglavlje" odjavi={() => setPrijavljen(false)}/>
          <div className="navigacija-sakrij">
            <Navigacija
              popisProjekata={projekti}
              popisFavorita={favoriti}
            />
          </div>
          
        </>
      )}

      <main className="stranica">


        <Routes>
          <Route
            path="/"
            element={
            <ZasticenaPutanja ispravan={prijavljen} putanja={"/prijava"} > 
            {window.innerWidth < 1024 && 
              <Navigacija
                popisProjekata={projekti}
                popisFavorita={favoriti}
              />
            }
            
            </ZasticenaPutanja>}
          />
          <Route
            path="/prijava"
            element={
              <ZasticenaPutanja ispravan={!prijavljen} putanja={"/"}>
                <Prijava prijavi={() => setPrijavljen(true)} />
              </ZasticenaPutanja>
            }
          />
          <Route
            path="/registracija"
            element={
              <ZasticenaPutanja ispravan={!prijavljen} putanja={"/"}>
                <Registracija registriraj={() => setPrijavljen(true)}  />
              </ZasticenaPutanja>
            }
          />
          <Route
            path="/trajni-zadaci"
            element={
              <ZasticenaPutanja ispravan={prijavljen} putanja={"/prijava"}>
                <TrajniZadaci />
              </ZasticenaPutanja>
            }
          />
          <Route
            path="/tjedni-zadaci"
            element={
              <ZasticenaPutanja ispravan={prijavljen} putanja={"/prijava"}>
                <TjedniZadaci />
              </ZasticenaPutanja>
            }
          />
          <Route
            path="/dnevni-zadaci"
            element={
              <ZasticenaPutanja ispravan={prijavljen} putanja={"/prijava"}>
                <DnevniZadaci />
              </ZasticenaPutanja>
            }
          />
          <Route
            path="/projekti"
            element={
              <ZasticenaPutanja ispravan={prijavljen} putanja={"/prijava"}>
                <Projekti
                  popisProjekata={projekti}
                  dodajProjekt={dodajProjekt}
                  obrisiProjekt={obrisiProjekt}
                />
              </ZasticenaPutanja>
            }
          />
          <Route
            path="/projekti/:id"
            element={
              <ZasticenaPutanja ispravan={prijavljen} putanja={"/prijava"}>
                <Projekt brisanjeProjekta={obrisiProjekt} />
              </ZasticenaPutanja>
            }
          />
          <Route
            path="/biljeske"
            element={
              <ZasticenaPutanja ispravan={prijavljen} putanja={"/prijava"}>
                <Biljeske favoritKlik={promijeniFavorit} />
              </ZasticenaPutanja>
            }
          />
          <Route
            path="/biljeske/:id"
            element={
              <ZasticenaPutanja ispravan={prijavljen} putanja={"/prijava"}>
                <Biljeska promijeniFavorita={promijeniFavorit} />
              </ZasticenaPutanja>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
