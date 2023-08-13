import React from 'react'
import PropTypes from 'prop-types'
import './Odjeljak.scss'

const Odjeljak = ({ naslov, children}) => {
  return (
    <div className='odjeljak'>
        <h2 className='odjeljak-naslov'>{naslov}</h2>
        {children}
    </div>
  )
}

Odjeljak.propTypes = {
    naslov: PropTypes.string,
    children: PropTypes.node
}

export default Odjeljak