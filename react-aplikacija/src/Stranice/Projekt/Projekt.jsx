import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import {
  dohvatiProjekt,
  dohvatiStanjaZavrsenosti,
  kreirajProjektniZadatak,
  promijeniStanjeProjektnogZadatka,
} from "../../PomocneFunkcije/projekti";
import {  formatirajDatum } from "../../PomocneFunkcije/datum";
import "./Projekt.scss";
import Odjeljak from "../../Komponente/Odjeljak/Odjeljak";
import Gumb from "../../Komponente/Gumb/Gumb";
import ProzorKreiranje from "../../Komponente/ProzorKreiranje/ProzorKreiranje";
import PotvrdniProzor from "../../Komponente/PotvrdniProzor/PotvrdniProzor";
import ProjektniZadatak from "../../Komponente/ProjektniZadatak/ProjektniZadatak";
import ZadatakDetalji from "../../Komponente/ZadatakDetalji/ZadatakDetalji";

const Projekt = ({ brisanjeProjekta }) => {
  const [nazivProjekta, setNazivProjekta] = useState("");
  const [stanjaIzvrsenosti, setStanjaIzvrsenosti] = useState([]);
  const [zadaci, setZadaci] = useState([]);
  const [dodavanje, setDodavanje] = useState(false);
  const [brisanje, setBrisanje] = useState(false);

  const [zadatakDetalji, setZadatakDetalji] = useState(null);
  const [zadatakDetaljiPrikaz, setZadatakDetaljiPrikaz] = useState(false);

  const id = useParams().id;
  const navigacija = useNavigate();

  const dohvatProjekta = async () => {
    const projekt = await dohvatiProjekt(id);
    setNazivProjekta(projekt.naziv);
    setZadaci(projekt.zadaci);
  };

  const dohvatStanjaIzvrsenosti = async () => {
    const stanja = await dohvatiStanjaZavrsenosti();
    setStanjaIzvrsenosti(stanja);
  };

  const dodajZadatak = async (naslov, opis, datum) => {
    const datum_zavrsetka = formatirajDatum(new Date(datum));
    const datum_kreiranja = formatirajDatum(new Date());
    const noviId = await kreirajProjektniZadatak(id, naslov, opis, stanjaIzvrsenosti[0].id, datum_zavrsetka, datum_kreiranja);
    const noviZadatak = {
      id: noviId,
      naslov: naslov,
      opis: opis,
      stanje_id: stanjaIzvrsenosti[0].id,
      datum_zavrsetka: datum_zavrsetka,
      datum_kreiranja: datum_kreiranja,
    };
    setZadaci([...zadaci, noviZadatak]);
    setDodavanje(false);
  };

  const klikLijevo = async (stanjeId, zadatakId) => {
    const trenutnoStanje = stanjaIzvrsenosti.findIndex(stanje => stanje.id === stanjeId);    
    const novoStanje = stanjaIzvrsenosti[trenutnoStanje - 1].id;
    
    await promijeniStanjeProjektnogZadatka(zadatakId, novoStanje);

    const noviZadaci = zadaci.map(zadatak =>
      zadatak.id === zadatakId ? { ...zadatak, stanje_id: novoStanje } : zadatak
    );
    setZadaci(noviZadaci);
  };

  const klikDesno = async (stanjeId, zadatakId) => {
    const trenutnoStanje = stanjaIzvrsenosti.findIndex(stanje => stanje.id === stanjeId);    
    const novoStanje = stanjaIzvrsenosti[trenutnoStanje + 1].id;
    
    await promijeniStanjeProjektnogZadatka(zadatakId, novoStanje);

    const noviZadaci = zadaci.map(zadatak =>
      zadatak.id === zadatakId ? { ...zadatak, stanje_id: novoStanje } : zadatak
    );
    setZadaci(noviZadaci);
  };

  const azurirajDatumZadatka = (id, datum_zavrsetka) => {
    const noviZadaci = zadaci.map((zadatak) =>
      zadatak.id === id ? { ...zadatak, datum_zavrsetka: datum_zavrsetka } : zadatak
    );
    setZadaci(noviZadaci);
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
      <div className="projekt-omotac-gumba">
        <Gumb
          tekst="Novi zadatak"
          poziv={() => {
            setDodavanje(true);
          }}
        />
        <Gumb
          tekst="Obriši projekt"
          poziv={() => {
            setBrisanje(true);
          }}
        />
      </div>
      <div className="omotac-zadataka">
        {stanjaIzvrsenosti.map((stanje, idStanja, polje) => (
          <Odjeljak naslov={stanje.naziv} sekundarni key={stanje.id}>
            {zadaci.length > 0 && (
              zadaci
                .filter((zadatak) => zadatak.stanje_id === stanje.id)
                .map((zadatak) => (
                  <ProjektniZadatak
                    key={zadatak.id}
                    naslov={zadatak.naslov}
                    opis={zadatak.opis}
                    prikazanoLijevo={idStanja > 0}
                    prikazanoDesno={idStanja < polje.length - 1}
                    klikDesno={() => klikDesno(stanje.id, zadatak.id)}
                    klikLijevo={() => klikLijevo(stanje.id, zadatak.id)}
                    datum={zadatak.datum_zavrsetka}
                    klikPoziv={() => {
                      setZadatakDetalji(zadatak);
                      setZadatakDetaljiPrikaz(true);
                    }}
                  />
                ))
            )}
          </Odjeljak>
        ))}
      </div>

      {dodavanje && (
        <ProzorKreiranje
          naslov="Novi zadatak"
          odustani={() => setDodavanje(false)}
          kreiraj={dodajZadatak} 
          unosDatuma
        />
      )}

      {brisanje && (
        <PotvrdniProzor
          tekst="Želite li obrisati projekt?"
          potvrdi={() => {
            brisanjeProjekta(id);
            navigacija("/projekti");
          }}
          odustani={() => setBrisanje(false)}
        />
      )}

      {zadatakDetaljiPrikaz && (
        <ZadatakDetalji 
          idZadatka={zadatakDetalji.id}
          naslov={zadatakDetalji.naslov}
          zatvori={() => setZadatakDetaljiPrikaz(false)}
          datumKreiranja={zadatakDetalji.datum_kreiranja}
          datumZavrsetka={zadatakDetalji.datum_zavrsetka}
          stanje={stanjaIzvrsenosti.find(stanje => stanje.id === zadatakDetalji.stanje_id).naziv}
          datumPromjene={zadatakDetalji.datum_promjene}
          azuriranjeDatuma={azurirajDatumZadatka}
        />
      )}

    </>
  );
};

Projekt.propTypes = {
  brisanjeProjekta: PropTypes.func,
};

export default Projekt;