import React from 'react';
import PropTypes from 'prop-types';
import './Zadatak.scss';
import ikonaBrisanje from '../../Resursi/ikona-brisanje.png';

const Zadatak = ({ naslov, opis, zavrsen, promijeniStanje, brisanje}) => {

  return (
    <div className="zadatak">
      <input type="checkbox" checked={zavrsen} onChange={promijeniStanje}/>
      <div className="zadatak-detalji">
        <span className="zadatak-naslov">{naslov}</span>
        <span className="zadatak-opis">{opis}</span>
      </div>
      <img src={ikonaBrisanje} alt='Ikona za brisanje' className='ikona-brisanje' onClick={brisanje}/>
    </div>
  );
};

Zadatak.propTypes = {
  naslov: PropTypes.string,
  opis: PropTypes.string,
  zavrsen: PropTypes.bool,
  promijeniStanje: PropTypes.func,
  brisanje: PropTypes.func,
};

export default Zadatak;
