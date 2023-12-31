import React from 'react'
import PropTypes from 'prop-types'
import Gumb from '../Gumb/Gumb'
import './Zaglavlje.scss'
import { odjaviKorisnika } from '../../PomocneFunkcije/korisnici'
import { useNavigate } from 'react-router-dom'

const Zaglavlje = ({ odjavi }) => {
  const navigacija = useNavigate();
  return (
    <>
    <div className="zaglavlje"> 
      <p className="logotip" onClick={() => {navigacija('/')}}>Planer</p>
      <div className="omotac-gumba"> 
        <div className="gumb-zaglavlja">
          <Gumb tekst="Odjava" poziv={() => {odjavi(); odjaviKorisnika()}} />
        </div>
      </div>
    </div>
    </>
  )
}

Zaglavlje.propTypes = {
  odjavi: PropTypes.func
}

export default Zaglavlje