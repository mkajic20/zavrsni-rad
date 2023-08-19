import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './PadajuciOdjeljak.scss'
import ikonaStrelice from '../../Resursi/strelica.png'

const PadajuciOdjeljak = ({ naslov, children }) => {
  const [prosiren, setProsiren] = useState(false);
  return (
    <div className='padajuci-odjeljak' >
      <div className='padajuci-odjeljak-naslov' onClick={() => {setProsiren(!prosiren)}}>
      <img
          src={ikonaStrelice}
          className={`strelica-ikona ${prosiren ? 'rotiraj' : ''}`}
          height={30}
          alt="strelica"
        />
        <h2>{naslov}</h2>
      </div>
      <div>
        {prosiren && (
        <div className={`padajuci-odjeljak-djeca ${prosiren ? 'prikazan' : 'sa'}`}>
          {children}
        </div>
      )}
      </div>
    </div>
  )
}
PadajuciOdjeljak.propTypes = {
  naslov: PropTypes.string,
  children: PropTypes.node
}

export default PadajuciOdjeljak