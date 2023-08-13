import React from 'react'
import PropTypes from 'prop-types'
import Gumb from '../../Komponente/Gumb/Gumb'

const Projekti = props => {
  return (
    <>
        <h1>Svi projekti</h1>
        <div className='gumb-dodaj'>
            <Gumb tekst="Novi projekt" poziv={() => {}}/>
      </div>
    </>
  )
}

Projekti.propTypes = {}

export default Projekti