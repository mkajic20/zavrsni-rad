import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  azurirajKategorijuBiljeske,
  azurirajSadrzajBiljeske,
  dohvatiBiljesku,
  dohvatiKategorijeBiljeski,
} from "../../PomocneFunkcije/server";
import Gumb from "../../Komponente/Gumb/Gumb";
import "./Biljeska.scss";
import PadajuciIzbornik from "../../Komponente/PadajuciIzbornik/PadajuciIzbornik";
import Stavka from "../../Komponente/Stavka/Stavka";
import ikonaFavorit from '../../Resursi/favorit.png';
import ikonaNijeFavorit from '../../Resursi/nije-favorit.png'

const Biljeska = ({ promijeniFavorita }) => {

  const [biljeska, setBiljeska] = useState({});
  const [tekst, setTekst] = useState("");
  const [popisKategorija, setPopisKategorija] = useState([]);
  const [kategorijeBiljeske, setKategorijeBiljeske] = useState([]);
  const [favorit, setFavorit] = useState(false);
  const id = useParams().id;

  const dohvatPodataka = async () => {
    const podaci = await dohvatiBiljesku(id);
    setBiljeska(podaci);
    setTekst(podaci.sadrzaj);
    setKategorijeBiljeske(podaci.kategorije || []);
    setFavorit(kategorijeBiljeske.includes(1));
  };

  const spremiPromjene = async () => {
    await azurirajSadrzajBiljeske(id, tekst);
    setBiljeska({ ...biljeska, sadrzaj: tekst });
  };

  const dohvatiSveKategorije = async () => {
    const popisKategorija = await dohvatiKategorijeBiljeski();
    setPopisKategorija(popisKategorija);
  };

  const promjenaKategorije = async (idKategorije) => {
    const kategorijaPostoji = kategorijeBiljeske.includes(idKategorije);
    await azurirajKategorijuBiljeske(id, idKategorije, kategorijaPostoji);

    if (kategorijaPostoji) {
      setKategorijeBiljeske(
        kategorijeBiljeske.filter((id) => id !== idKategorije)
      );
    } else {
      setKategorijeBiljeske([...kategorijeBiljeske, idKategorije]);
    }
  };

  useEffect(() => {
    const asinkroniDohvat = async () => {
      await dohvatPodataka();
      await dohvatiSveKategorije();
    };

    asinkroniDohvat();
  }, [id]);

  return (
    <>
      <h1>{biljeska.naslov}</h1>
      <div className="biljeska-gumbi">
        <Gumb
          tekst="Spremi"
          iskljucen={biljeska.sadrzaj === tekst}
          poziv={spremiPromjene}
        />

        <div className="biljeska-kategorije">
          <PadajuciIzbornik naslov="Kategorije">
            {popisKategorija.map(
              (kategorija) =>
                kategorija.id !== 9999 &&
                kategorija.id !== 1 && (
                  <Stavka
                    bezBrisanja
                    bezOpisa
                    naslov={kategorija.naziv}
                    zavrsen={kategorijeBiljeske.includes(kategorija.id)}
                    promijeniStanje={() => promjenaKategorije(kategorija.id)}
                  />
                )
            )}
          </PadajuciIzbornik>
          {favorit ? 
            <img src={ikonaFavorit} alt='Favorit' className="ikona-favorit" width={30} onClick={() => {setFavorit(false); promijeniFavorita(biljeska, false);}} /> 
            : 
            <img src={ikonaNijeFavorit} alt='Nije favorit' className="ikona-favorit" width={30} onClick={() => {setFavorit(true); promijeniFavorita(biljeska, true);}} />   
          }
        </div>

        
      </div>

      <textarea
        className="biljeska-sadrzaj"
        value={tekst}
        onChange={(e) => setTekst(e.target.value)}
        rows={20}
        cols={100}
      />
    </>
  );
};

Biljeska.propTypes = {
  popisBiljeski: PropTypes.array,
  kreirajKategoriju: PropTypes.func,
};

export default Biljeska;