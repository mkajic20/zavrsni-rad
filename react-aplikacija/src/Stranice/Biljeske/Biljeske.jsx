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
  //TODO: implementirati dodavanje biljeski
  //TODO: implementirati dodavanje kategorija
  //TODO: implementirati brisanje kategorije

  //TODO: prebaciti popisKategorija i kreriranje kategorija u komponentu, ukloniti ih iz navigacije
  //TODO: u navigaciji prikazati popis favorita

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
                      navigacija(`/biljeske/${biljeska.id}`);
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
    </>
  );
};

Biljeske.propTypes = {
  popisBiljeski: PropTypes.array,
  kreirajKategoriju: PropTypes.func,
};

export default Biljeske;
