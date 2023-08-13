import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Gumb from '../../Komponente/Gumb/Gumb'
import ProzorKreiranje from '../../Komponente/ProzorKreiranje/ProzorKreiranje';
import Stavka from '../../Komponente/Stavka/Stavka';
import './Projekti.scss'
import { useNavigate } from "react-router-dom";
import PotvrdniProzor from '../../Komponente/PotvrdniProzor/PotvrdniProzor';

const Projekti = ( {popisProjekata, dodajProjekt, obrisiProjekt} ) => {
  const [dodavanje, setDodavanje] = useState(false);
  const [brisanje, setBrisanje] = useState(false);
  const [projektZaBrisanje, setProjektZaBrisanje] = useState(null);

  const navigacija = useNavigate();

  const kreirajProjekt = (naziv) => {
    dodajProjekt(naziv);
    setDodavanje(false);
  }

  const brisanjeProjekta = () => {
    obrisiProjekt(projektZaBrisanje);
    setBrisanje(false);
  }

  return (
    <>
        <h1>Svi projekti</h1>
        <div className='gumb-dodaj'>
          <Gumb tekst="Novi projekt" poziv={() => {setDodavanje(true)}}/>
        </div>
        <div className="popis-projekata">
          {popisProjekata.map((projekt) => (
          <Stavka 
            key={projekt.id} 
            naslov={projekt.naziv} 
            bezPotvrdnogOkvira 
            bezOpisa 
            klikPoziv={() => {navigacija(`${projekt.id}`)}} 
            brisanje={() => {
              setBrisanje(true);
              setProjektZaBrisanje(projekt.id);
            }}
          />
          ))}
        </div>

        {dodavanje && <ProzorKreiranje naslov="Novi projekt" odustani={() => {setDodavanje(false)}} kreiraj={kreirajProjekt} sekundarni/>}
        {brisanje && 
        <PotvrdniProzor 
          tekst="Želite li obrisati projekt?" 
          odustani={() => {setBrisanje(false)}} 
          potvrdi={brisanjeProjekta}/>}

    </>
  )
}

Projekti.propTypes = {
  popisProjekata: PropTypes.array,
  dodajProjekt: PropTypes.func,
  obrisiProjekt: PropTypes.func
}

export default Projekti