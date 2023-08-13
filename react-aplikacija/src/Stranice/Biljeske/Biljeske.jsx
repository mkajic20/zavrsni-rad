import React from 'react'
import PropTypes from 'prop-types'
import Gumb from '../../Komponente/Gumb/Gumb'
import './Biljeske.scss'


const Biljeske = ({ popisBiljeski, kreirajKategoriju }) => {
  return (
    <>
        <h1>Bilješke</h1>
        <div className='biljeske-gumbi'>
            <Gumb tekst="Nova kategorija" poziv={kreirajKategoriju}/>
            <Gumb tekst="Nova biljeska" poziv={kreirajKategoriju}/>
        </div>
    </>
  )
}

Biljeske.propTypes = {
    popisBiljeski: PropTypes.array,
    kreirajKategoriju: PropTypes.func
}

export default Biljeske