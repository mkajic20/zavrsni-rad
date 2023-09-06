import React from 'react'
import PropTypes from 'prop-types'
import './ProjektniZadatak.scss'
import ikonaStrelica from '../../Resursi/strelica.png'

const ProjektniZadatak = ({naslov, opis, klikLijevo, klikDesno, prikazanoLijevo, prikazanoDesno, datum, klikPoziv, sekundarni}) => {
    const klaseLijevo = prikazanoLijevo ? 'projektni-zadatak-lijevo' : 'projektni-zadatak-lijevo skrivena-strelica';
    const klaseDesno = prikazanoDesno ? 'projektni-zadatak-desno' : 'projektni-zadatak-desno skrivena-strelica';
  return (
    <div className={`projektni-zadatak ${sekundarni ? 'sekundarni-zadatak' : ''}`}>
        <img src={ikonaStrelica} height={20} alt='Strelica lijevo' className={klaseLijevo} onClick={klikLijevo}/>
        <div className='projektni-zadatak-detalji' onClick={() => {klikPoziv()}}>
            <span className="projektni-zadatak-naslov">{naslov}</span>
          <span className="projektni-zadatak-opis">{opis}</span>
          <span className="projektni-zadatak-datum">{datum}</span>
        </div>
        <img src={ikonaStrelica} height={20} alt='Strelica desno' className={klaseDesno} onClick={klikDesno}/>
    </div>
  )
}

ProjektniZadatak.propTypes = {
    naslov: PropTypes.string,
    opis: PropTypes.string,
    klikLijevo: PropTypes.func,
    klikDesno: PropTypes.func,
    prikazanoLijevo: PropTypes.bool,
    prikazanoDesno: PropTypes.bool,
    datum: PropTypes.string,
    klikPoziv: PropTypes.func,
    sekundarni: PropTypes.bool
}

export default ProjektniZadatak