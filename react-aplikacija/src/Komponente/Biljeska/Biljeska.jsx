import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Biljeska.scss';
import ikonaBrisanje from '../../Resursi/ikona-brisanje.png';
import ikonaFavorit from '../../Resursi/favorit.png';
import ikonaNijeFavorit from '../../Resursi/nije-favorit.png'

const Biljeska = ({ naslov, brisanje, klikPoziv, biljeskaFavorit, favoritKlik}) => {
    const [favorit, setFavorit] = useState(biljeskaFavorit);

    useEffect(() => {
      setFavorit(biljeskaFavorit);
    }, [biljeskaFavorit]);

  return (
    <div className='biljeska'>
        <span className="biljeska-naslov" onClick={klikPoziv}>{naslov}</span>
        <img src={ikonaBrisanje} alt='Ikona za brisanje' className='ikona' onClick={brisanje}/>
        {favorit ? 
            <img src={ikonaFavorit} alt='Favorit' className='ikona' onClick={() => {setFavorit(false); favoritKlik();}} /> 
            : 
            <img src={ikonaNijeFavorit} alt='Nije favorit' className='ikona' onClick={() => {setFavorit(true); favoritKlik();}} />   
        }
    </div>
  );
};

Biljeska.propTypes = {
  naslov: PropTypes.string,
  zavrsen: PropTypes.bool,
  brisanje: PropTypes.func,
  klikPoziv: PropTypes.func,
  biljeskaFavorit: PropTypes.bool
};

export default Biljeska;
