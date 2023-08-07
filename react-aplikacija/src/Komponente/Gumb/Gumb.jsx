import React from 'react'
import PropTypes from 'prop-types'
import './Gumb.scss'

const Gumb = ({ tekst, poziv })  => {
  return (
    <button className="gumb" onClick={poziv}>{tekst}</button>
  )
}

Gumb.propTypes = {
    tekst: PropTypes.string,
    poziv: PropTypes.func
}

export default Gumb