import React from 'react'
import PropTypes from 'prop-types'
import './Navigacija.scss'

const Navigacija = props => {

  //TODO: ucitati popis projekata sa servera i prikazati ih u navigaciji
  //potencijalno ih ne pokazati jer ce ih mozda biti previse da bi svi stali u navigaciju, u tom slucaju pokazati nekoliko / napraviti kategoriju

  //TODO: ucitati popis kategorija biljeski sa servera i prikazati ih u navigaciji
  //prilikom registracije korisnika automatski dodati kategoriju Favoriti
  
  return (
    <div className="navigacija">
      <section>
        <h3>Zadaci</h3>
        <a href="/trajni-zadaci">Trajni</a> 
        <a href="/tjedni-zadaci">Tjedni</a>
        <a href="/dnevni-zadaci">Dnevni</a>
      </section>

      <section>
        <a href="/projekti"><h3>Projekti</h3></a>
        <a href="/projekti/1">Projekt 1</a> 
        <a href="/projekti/2">Projekt 2</a>
      </section>

      <section >
        <a href="/biljeske"><h3>Bilješke</h3></a>
        <a href="/biljeske/kategorija/1">Favoriti</a> 
        <a href="/biljeske/kategorija/2">Kategorija 2</a>
      </section>
    </div>
  )
}

Navigacija.propTypes = {}

export default Navigacija