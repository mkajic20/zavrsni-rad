import React from 'react'
import PropTypes from 'prop-types'
import './Odjeljak.scss'

const Odjeljak = ({ naslov, sekundarni, children}) => {
  const odjeljakClassName = `odjeljak ${sekundarni ? 'sekundarni' : ''}`;

  return (
    <div className={odjeljakClassName}>
      <h2 className='odjeljak-naslov'>{naslov}</h2>
      {children}
    </div>
  );
}

Odjeljak.propTypes = {
    naslov: PropTypes.string,
    sekundarni: PropTypes.bool,
    children: PropTypes.node
}

export default Odjeljak