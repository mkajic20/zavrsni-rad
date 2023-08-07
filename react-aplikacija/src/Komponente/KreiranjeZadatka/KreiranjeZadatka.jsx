import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './KreiranjeZadatka.scss'
import Gumb from '../Gumb/Gumb';

const KreiranjeZadatka = ({ kreiraj, odustani }) => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');

  //TODO: kreirati komponente za polja za unos
  //TODO: validacija unosa

  return (
    <div className="kreiranje-zadatka">
      <a onClick={odustani} className='kreiranje-zadatka-pozadina'></a>

      <div className="kreiranje-zadatka-sadrzaj">
        <h3>Novi zadatak</h3>
        <form>
          <label htmlFor="naziv">Naziv zadatka</label>
          <input 
            type="text" 
            id="naziv" 
            name="naziv" 
            placeholder="Naziv zadatka" 
            onChange={(e) => setNaziv(e.target.value)} 
            required />
          <label htmlFor="opis">Opis zadatka</label>
          <textarea 
            id="opis" 
            name="opis" 
            onChange={(e) => setOpis(e.target.value)} 
            placeholder="Opis zadatka" 
            required />
          <div className='kreiranje-zadatka-gumbi'>
            <Gumb tekst="Odustani" poziv={odustani}/>
            <Gumb tekst="Kreiraj" poziv={() => kreiraj(naziv, opis)} />
          </div>
          
        </form>
      </div>
    </div>
  );
}

KreiranjeZadatka.propTypes = {
  kreiraj: PropTypes.func,
  odustani: PropTypes.func,
}

export default KreiranjeZadatka;