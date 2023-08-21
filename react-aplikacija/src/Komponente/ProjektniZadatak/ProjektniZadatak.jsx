import React from 'react'
import PropTypes from 'prop-types'
import './ProjektniZadatak.scss'
import ikonaStrelica from '../../Resursi/strelica.png'

const ProjektniZadatak = ({naslov, opis, klikLijevo, klikDesno, prikazanoLijevo, prikazanoDesno}) => {
    const klaseLijevo = prikazanoLijevo ? 'projektni-zadatak-lijevo' : 'projektni-zadatak-lijevo skrivena-strelica';
    const klaseDesno = prikazanoDesno ? 'projektni-zadatak-desno' : 'projektni-zadatak-desno skrivena-strelica';
  return (
    <div className='projektni-zadatak'>
        <img src={ikonaStrelica} height={20} alt='Strelica lijevo' className={klaseLijevo} onClick={klikLijevo}/>
        <div className='projektni-zadatak-detalji'>
            <span className="projektni-zadatak-naslov">{naslov}</span>
          <span className="projektni-zadatak-opis">{opis}</span>
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
    prikazanoDesno: PropTypes.bool
}

export default ProjektniZadatak