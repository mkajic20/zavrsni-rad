import React from 'react'
import PropTypes from 'prop-types'
import './Odjeljak.scss'

const Odjeljak = props => {
  return (
    <div className='odjeljak'>
        <h2 className='odjeljak-naslov'>{props.naslov}</h2>
        {props.children}
    </div>
  )
}

Odjeljak.propTypes = {
    naslov: PropTypes.string,
    children: PropTypes.node
}

export default Odjeljak