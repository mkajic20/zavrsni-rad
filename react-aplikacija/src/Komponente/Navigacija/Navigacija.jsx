import React from 'react'
import PropTypes from 'prop-types'
import './Navigacija.scss'
import { useNavigate } from "react-router-dom";

const Navigacija = ({ popisProjekata, popisFavorita }) => {
  const navigacija = useNavigate();
  console.log(popisFavorita)
  
  return (
    <div className="navigacija">
      <section>
        <h3 className='navigacija-naslov'>Zadaci</h3>
        <a className='navigacija-poveznica' onClick={() => {navigacija(`/trajni-zadaci`)}}>Trajni</a> 
        <a className='navigacija-poveznica' onClick={() => {navigacija(`/tjedni-zadaci`)}}>Tjedni</a>
        <a className='navigacija-poveznica' onClick={() => {navigacija(`/dnevni-zadaci`)}}>Dnevni</a>
      </section>

      <section>
        <a className='navigacija-poveznica' onClick={() => {navigacija(`/projekti`)}}><h3 className='navigacija-naslov'>Projekti</h3></a>
        {popisProjekata.map(projekt => 
          <a className='navigacija-poveznica' key={projekt.id} onClick={() => {navigacija(`/projekti/${projekt.id}`)}}>{projekt.naziv}</a>
        )} 
      </section>

      <section >
        <a className='navigacija-poveznica' onClick={() => {navigacija(`/biljeske`)}}><h3 className='navigacija-naslov'>Bilješke</h3></a>
        {popisFavorita.map(favorit =>
          <a className='navigacija-poveznica' key={favorit.id} onClick={() => {navigacija(`/biljeske/${favorit.id}`)}}>{favorit.naslov}</a>
        )}
      </section>
    </div>
  )
}

Navigacija.propTypes = {
  popisProjekata: PropTypes.array,
  popisFavorita: PropTypes.array
}

export default Navigacija