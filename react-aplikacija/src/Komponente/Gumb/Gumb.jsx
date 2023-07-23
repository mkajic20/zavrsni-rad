import React from 'react'
import PropTypes from 'prop-types'
import './Gumb.scss'

const Gumb = props => {
  return (
    <button class="gumb">{props.tekst}</button>
  )
}

Gumb.propTypes = {
    tekst: PropTypes.string
}

export default Gumb