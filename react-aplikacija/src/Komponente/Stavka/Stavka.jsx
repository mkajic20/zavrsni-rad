import React from 'react';
import PropTypes from 'prop-types';
import './Stavka.scss';
import ikonaBrisanje from '../../Resursi/ikona-brisanje.png';

const Stavka = ({ naslov, opis, zavrsen, promijeniStanje, brisanje, klikPoziv, bezPotvrdnogOkvira, bezOpisa, bezBrisanja}) => {
  const klasaStavke = `stavka ${klikPoziv ? 'promjena-pokazivaca' : ''}`;

  return (
    <div className={klasaStavke}>
      {!bezPotvrdnogOkvira && 
        <input type="checkbox" checked={zavrsen} onChange={promijeniStanje}/>
      }
      <div className="stavka-detalji" onClick={klikPoziv}>
        <span className="stavka-naslov">{naslov}</span>
        {!bezOpisa &&
          <span className="stavka-opis">{opis}</span>
        }
      </div>
      {!bezBrisanja && 
        <img src={ikonaBrisanje} alt='Ikona za brisanje' className='ikona-brisanje' onClick={brisanje}/>
      }
      
    </div>
  );
};

Stavka.propTypes = {
  naslov: PropTypes.string,
  opis: PropTypes.string,
  zavrsen: PropTypes.bool,
  promijeniStanje: PropTypes.func,
  brisanje: PropTypes.func,
  bezPotvrdnogOkvira: PropTypes.bool,
  bezOpisa: PropTypes.bool,
  klikPoziv: PropTypes.func,
};

export default Stavka;
