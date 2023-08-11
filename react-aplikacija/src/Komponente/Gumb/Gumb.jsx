import React from 'react'
import PropTypes from 'prop-types'
import './Gumb.scss'

const Gumb = ({ tekst, poziv, iskljucen })  => {
  return (
    <button className="gumb" onClick={poziv} disabled={iskljucen}>{tekst}</button>
  )
}

Gumb.propTypes = {
    tekst: PropTypes.string,
    poziv: PropTypes.func,
    iskljucen: PropTypes.bool
}

export default Gumb