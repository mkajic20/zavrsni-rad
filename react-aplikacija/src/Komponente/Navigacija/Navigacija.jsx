import React from 'react'
import PropTypes from 'prop-types'
import './Navigacija.scss'
import { useNavigate } from "react-router-dom";

const Navigacija = ({ popisProjekata, popisKategorija }) => {
  const navigacija = useNavigate();
  
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
        {popisKategorija.map(kategorija =>
          <a className='navigacija-poveznica' key={kategorija.id} onClick={() => {navigacija(`/biljeske/kategorija/${kategorija.id}`)}}>{kategorija.naziv}</a>
        )}
      </section>
    </div>
  )
}

Navigacija.propTypes = {
  popisProjekata: PropTypes.array,
  popisKategorija: PropTypes.array
}

export default Navigacija