import React from 'react'
import PropTypes from 'prop-types'
import Gumb from '../Gumb/Gumb'
import './Zaglavlje.scss'

const Zaglavlje = props => {
  return (
    <>
    <div class="zaglavlje"> 
      <p class="logotip">TaskHub</p>
      <div class="omotac-gumba"> 
        <div class="gumb-zaglavlja">
          <Gumb tekst="Prijava" />
        </div>
        <div class="gumb-zaglavlja">
          <Gumb tekst="Registracija" />
        </div>
      </div>
    </div>
      

    </>
  )
}

Zaglavlje.propTypes = {}

export default Zaglavlje