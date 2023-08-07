import React from 'react'
import PropTypes from 'prop-types'
import './PotvrdniProzor.scss'
import Gumb from '../Gumb/Gumb'

const PotvrdniProzor = ({tekst, potvrdi, odustani}) => {
  return (
    <div className='potvrdni-prozor'>
        <a onClick={odustani} className='potvrdni-prozor-pozadina'></a>
        <div className='potvrdni-prozor-sadrzaj'>
            <h3>{tekst}</h3>
            <div className='potvrdni-prozor-gumbi'>
                <Gumb tekst='Potvrdi' poziv={potvrdi}/>
                <Gumb tekst='Odustani' poziv={odustani}/>
            </div>
            
        </div>
    </div>
  )
}

PotvrdniProzor.propTypes = {
    tekst: PropTypes.string,
    potvrdi: PropTypes.func,
    odustani: PropTypes.func,
}

export default PotvrdniProzor