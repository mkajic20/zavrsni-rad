import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProzorKreiranje.scss';
import Gumb from '../Gumb/Gumb';
import TekstualnoPolje from '../TekstualnoPolje/TekstualnoPolje';

const ProzorKreiranje = ({ naslov, kreiraj, odustani, sekundarni }) => {
  const [naziv, setNaziv] = useState('');
  const [nazivGreska, setNazivGreska] = useState('');
  const [opis, setOpis] = useState('');
  const [opisGreska, setOpisGreska] = useState('');

  const validacijaNaziva = () => {
    if (!naziv) {
      setNazivGreska('Morate unijeti naziv');
      return false;
    } else if (naziv.length > 30) {
      setNazivGreska('Naziv ne smije prelaziti 30 znakova');
      return false;
    } else {
      setNazivGreska('');
      return true;
    }
  };

  const validacijaOpisa = () => {
    if (opis.length > 100) {
      setOpisGreska('Opis ne smije prelaziti 100 znakova');
      return false;
    }
    setOpisGreska('');
    return true;
  };

  const pozivKreiraj = () => {
    const nazivIspravan = validacijaNaziva();
    const opisIspravan = !sekundarni || validacijaOpisa();

    if (nazivIspravan && opisIspravan) {
      if (!sekundarni) {
        kreiraj(naziv, opis);
      } else {
        kreiraj(naziv);
      }
    }
  };

  return (
    <div className="prozor-kreiranje">
      <a onClick={odustani} className="prozor-kreiranje-pozadina"></a>

      <div className="prozor-kreiranje-sadrzaj">
        <h3>{naslov}</h3>
        <div className="forma">
          <label htmlFor="naziv">Naziv</label>
          <div>
            <TekstualnoPolje 
              naziv="naziv"
              validacija={validacijaNaziva}
              neispravanUnos={nazivGreska}
              promjena={(naziv) => setNaziv(naziv)}ž
              poruka={"0 - 30 znakova"}
            />
          {nazivGreska && <div className="poruka-greske">{nazivGreska}</div>}
          {!nazivGreska && <div className="pozicija-greske"></div>} 
          </div>
          

          {!sekundarni && (
            <>
              <label htmlFor="opis">Opis</label>
              <div>
                <textarea
                className={`polje-opis ${opisGreska ? 'neispravan-unos' : ''}`}
                id="opis"
                name="opis"
                onChange={(e) => setOpis(e.target.value)}
                onBlur={validacijaOpisa}
                placeholder="0 - 100 znakova"
                rows={3}
              />
              {opisGreska && <div className="poruka-greske">{opisGreska}</div>}
              {!opisGreska && <div className="pozicija-greske"></div>}
              </div>
              
            </>
          )}

          <div className="prozor-kreiranje-gumbi">
            <Gumb tekst="Odustani" poziv={odustani} />
            <Gumb tekst="Kreiraj" poziv={pozivKreiraj} />
          </div>
        </div>
      </div>
    </div>
  );
};

ProzorKreiranje.propTypes = {
  kreiraj: PropTypes.func,
  odustani: PropTypes.func,
  sekundarni: PropTypes.bool,
};

export default ProzorKreiranje;
