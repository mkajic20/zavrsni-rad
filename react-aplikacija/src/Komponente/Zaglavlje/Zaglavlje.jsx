import React from 'react'
import PropTypes from 'prop-types'
import Gumb from '../Gumb/Gumb'
import './Zaglavlje.scss'

const Zaglavlje = props => {
  return (
    <>
    <div className="zaglavlje"> 
      <p className="logotip">TaskHub</p>
      <div className="omotac-gumba"> 
        <div className="gumb-zaglavlja">
          <Gumb tekst="Odjava" />
        </div>
      </div>
    </div>
    </>
  )
}

Zaglavlje.propTypes = {}

export default Zaglavlje