import React from 'react'
import PropTypes from 'prop-types'
import './Navigacija.scss'
import { useNavigate } from "react-router-dom";

const Navigacija = ({ popisProjekata, popisFavorita }) => {
  const navigacija = useNavigate();
  
  return (
    <div className="navigacija">
      <section>
        <h3 className='navigacija-naslov navigacija-poveznica' onClick={() => {navigacija(`/tjedni-pregled`)}}>Tjedni pregled</h3>
      </section>
      
      <section>
        <h3 className='navigacija-naslov'>Zadaci</h3>
        <p className='navigacija-poveznica' onClick={() => {navigacija(`/trajni-zadaci`)}}>Trajni</p> 
        <p className='navigacija-poveznica' onClick={() => {navigacija(`/tjedni-zadaci`)}}>Tjedni</p>
        <p className='navigacija-poveznica' onClick={() => {navigacija(`/dnevni-zadaci`)}}>Dnevni</p>
      </section>

      <section>
        <h3 className='navigacija-poveznica navigacija-naslov' onClick={() => {navigacija(`/projekti`)}}>Projekti</h3>
        {popisProjekata.map(projekt => 
          <p className='navigacija-poveznica' key={projekt.id} onClick={() => {navigacija(`/projekti/${projekt.id}`)}}>{projekt.naziv}</p>
        )} 
      </section>

      <section >
        <h3 className='navigacija-poveznica navigacija-naslov' onClick={() => {navigacija(`/biljeske`)}}>Bilješke</h3>
        {popisFavorita.map(favorit =>
          <p className='navigacija-poveznica' key={favorit.id} onClick={() => {navigacija(`/biljeske/${favorit.id}`)}}>{favorit.naslov}</p>
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