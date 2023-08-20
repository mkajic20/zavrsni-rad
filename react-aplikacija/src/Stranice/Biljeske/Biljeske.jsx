import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Gumb from "../../Komponente/Gumb/Gumb";
import "./Biljeske.scss";
import PadajuciOdjeljak from "../../Komponente/PadajuciOdjeljak/PadajuciOdjeljak";
import {
  dohvatiBiljeske,
  kreirajKategorijuBiljeski,
  promijeniFavorita,
  dohvatiKategorijeBiljeski,
} from "../../PomocneFunkcije/server";
import Biljeska from "../../Komponente/Biljeska/Biljeska";
import ProzorKreiranje from "../../Komponente/ProzorKreiranje/ProzorKreiranje";
import { useNavigate } from "react-router-dom";

const Biljeske = ({ favoritKlik }) => {

  const [popisBiljeski, setPopisBiljeski] = useState([]);
  const [dodavanjeKategorije, setDodavanjeKategorije] = useState(false);
  const [dodavanjeBiljeske, setDodavanjeBiljeske] = useState(false);
  const [popisKategorija, setPopisKategorija] = useState([]);

  const navigacija = useNavigate();

  const dohvatiSveBiljeske = async () => {
    const biljeske = await dohvatiBiljeske();
    setPopisBiljeski(biljeske);
  };

  const dohvatiSveKategorije = async () => {
    const popisKategorija = await dohvatiKategorijeBiljeski();
    setPopisKategorija(popisKategorija);
  };

  const promijeniStanjeFavorita = (id, novoStanje) => {
    promijeniFavorita(id, novoStanje);
    favoritKlik(
      popisBiljeski.find((biljeska) => biljeska.id === id),
      novoStanje
    );
    if (novoStanje) {
      setPopisBiljeski((prevPopisBiljeski) =>
        prevPopisBiljeski.map((biljeska) =>
          biljeska.id === id
            ? {
                ...biljeska,
                favorit: novoStanje,
                kategorije: [...biljeska.kategorije, { idKategorije: 1 }],
              }
            : biljeska
        )
      );
    } else {
      setPopisBiljeski((prevPopisBiljeski) =>
        prevPopisBiljeski.map((biljeska) =>
          biljeska.id === id
            ? {
                ...biljeska,
                favorit: novoStanje,
                kategorije: biljeska.kategorije.filter(
                  (kat) => kat.idKategorije !== 1
                ),
              }
            : biljeska
        )
      );
    }

  };

  const novaKategorija = async (naziv) => {
    //TODO: umjesto novaKategorija koristiti kreiranaKategorija
    const kreiranaKategorija = await kreirajKategorijuBiljeski(naziv);
    const novaKategorija = {
      id: popisKategorija.length + 1,
      naziv: naziv,  
    };
    setPopisKategorija([...popisKategorija, novaKategorija]);
    setDodavanjeKategorije(false);
  };

  const novaBiljeska = async (naziv) => {
    //TODO: umjesto novaBiljeska koristiti kreiranaBiljeska
    const kreiranaBiljeska = await kreirajKategorijuBiljeski(naziv);
    const novaBiljeska = {
      id: popisBiljeski.length + 1,
      naslov: naziv,
      favorit: false,
      kategorije: [
        {id: 777, idBiljeske: popisKategorija.length + 1, idKategorije: 9999}
      ]
    };

    setPopisBiljeski([...popisBiljeski, novaBiljeska]);
    setDodavanjeBiljeske(false);
    console.log(popisBiljeski)
  }

  useEffect(() => {
    const asinkroniDohvat = async () => {
      await dohvatiSveKategorije();
      await dohvatiSveBiljeske();
    };

    asinkroniDohvat();
  }, []);

  return (
    <>
      <h1>Bilješke</h1>
      <div className="biljeske-gumbi">
        <Gumb
          tekst="Nova kategorija"
          poziv={() => {
            setDodavanjeKategorije(true);
          }}
        />
        <Gumb
          tekst="Nova bilješka"
          poziv={() => {
            setDodavanjeBiljeske(true);
          }}
        />
      </div>
      <div className="biljeske-kategorije">
        {popisKategorija
          .sort((a, b) => a.id - b.id)
          .map((kategorija) => (
            <PadajuciOdjeljak key={kategorija.id} naslov={kategorija.naziv}>
              {popisBiljeski
                .filter((biljeska) =>
                  biljeska.kategorije.some(
                    (kat) => kat.idKategorije === kategorija.id
                  )
                )
                .map((biljeska) => (
                  <Biljeska
                    key={biljeska.id}
                    naslov={biljeska.naslov}
                    biljeskaFavorit={biljeska.favorit}
                    favoritKlik={() => {
                      promijeniStanjeFavorita(biljeska.id, !biljeska.favorit);
                    }}
                    klikPoziv={() => {
                      navigacija(`${biljeska.id}`);
                    }}
                  />
                ))}
            </PadajuciOdjeljak>
          ))}
      </div>

      {dodavanjeKategorije && (
        <ProzorKreiranje
          naslov="Nova kategorija"
          odustani={() => setDodavanjeKategorije(false)}
          kreiraj={novaKategorija}
          sekundarni
        />
      )}
      
      {dodavanjeBiljeske && (
        <ProzorKreiranje
          naslov="Nova biljeska"
          odustani={() => setDodavanjeBiljeske(false)}
          kreiraj={novaBiljeska}
          sekundarni
        />
      )}
    </>
  );
};

Biljeske.propTypes = {
  popisBiljeski: PropTypes.array,
  kreirajKategoriju: PropTypes.func,
};

export default Biljeske;