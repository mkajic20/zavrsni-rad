import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ZadatakDetalji.scss";
import Gumb from "../Gumb/Gumb";
import { formatirajDatum } from "../../PomocneFunkcije/datum";
import { promijeniDatumProjektnogZadatka } from "../../PomocneFunkcije/projekti";

const ZadatakDetalji = ({
    idZadatka,
  naslov,
  zatvori,
  datumKreiranja,
  datumZavrsetka,
  stanje,
  datumPromjene,
  azuriranjeDatuma
}) => {
  const datum = datumZavrsetka
    ? datumZavrsetka.split(".").reverse().join("-")
    : "";

  const [prikazaniDatum, setPrikazaniDatum] = useState(datum);

  const azurirajDatum = async (noviDatum) => {
    setPrikazaniDatum(noviDatum);
    const datum = formatirajDatum(new Date(noviDatum));
    azuriranjeDatuma(idZadatka, datum);
    await promijeniDatumProjektnogZadatka(idZadatka, datum);
  };

  return (
    <div className="zadatak-detalji">
      <a onClick={zatvori} className="zadatak-detalji-pozadina"></a>
      <div className="zadatak-detalji-sadrzaj">
        <h3>{naslov}</h3>
        <p>Kreirano {datumKreiranja}</p>
        <div>
            <label htmlFor="datumZavrsetka">Završava </label>
            <input
            type="date"
            id="datumZavrsetka"
            value={prikazaniDatum}
            onChange={(event) => azurirajDatum(event.target.value)}
            />
        </div>
        
        <p>Stanje: {stanje}</p>
        {datumPromjene && <p>Zadnja promjena: {datumPromjene}</p>}
        <div className="zadatak-detalji-gumbi">
          <Gumb tekst="Zatvori" poziv={zatvori} />
        </div>
      </div>
    </div>
  );
};

ZadatakDetalji.propTypes = {
    idZadatka: PropTypes.number,
  naslov: PropTypes.string,
  zatvori: PropTypes.func,
  datumKreiranja: PropTypes.string,
  datumZavrsetka: PropTypes.string,
  stanje: PropTypes.string,
  datumPromjene: PropTypes.string,
  azuriranjeDatuma: PropTypes.func
};

export default ZadatakDetalji;
