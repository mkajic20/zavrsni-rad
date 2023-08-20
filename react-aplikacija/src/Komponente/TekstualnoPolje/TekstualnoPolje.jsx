import React from 'react'
import PropTypes from 'prop-types'
import './TekstualnoPolje.scss'

const TekstualnoPolje = ({ naziv, validacija, neispravanUnos, promjena, lozinka, poruka }) => {
  return (
    <input
        className={`tekstualno-polje ${neispravanUnos ? 'neispravan-unos' : ''}`}
        type={lozinka ? 'password' : 'text'}
        id={naziv}
        name={naziv}
        placeholder={poruka}
        onChange={(e) => promjena(e.target.value)}
        onBlur={validacija}
        required
    />
  )
}

TekstualnoPolje.propTypes = {
    naziv: PropTypes.string,
    validacija: PropTypes.func,
    promjena: PropTypes.func,
    neispravanUnos: PropTypes.bool,
    lozinka: PropTypes.bool,
    poruka: PropTypes.string
}

export default TekstualnoPolje