import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { registrirajKorisnika } from '../../PomocneFunkcije/korisnici';
import TekstualnoPolje from '../../Komponente/TekstualnoPolje/TekstualnoPolje';
import Gumb from '../../Komponente/Gumb/Gumb';
import './Registracija.scss'

const Registracija = ({registriraj}) => {
    const [korime, setKorime] = useState('');
    const [korimeGreska, setKorimeGreska] = useState('');
    const [lozinka, setLozinka] = useState('');
    const [lozinkaGreska, setLozinkaGreska] = useState('');

    const navigacija = useNavigate();

    const validacijaKorime = () => {
        if (!korime) {
            setKorimeGreska('Morate unijeti korisničko ime');
            return false;
        } else if (korime.length > 15) {
            setKorimeGreska('Korisničko ime ne smije prelaziti 15 znakova');
            return false;
        } else {
            setKorimeGreska('');
            return true;
        }
    }

    const validacijaLozinka = () => {
        if(!lozinka) {
            setLozinkaGreska('Morate unijeti lozinku');
            return false;
        } else if (lozinka.length < 8) {
            setLozinkaGreska('Lozinka mora sadržavati minimalno 8 znakova');
            return false;
        } else {
            setLozinkaGreska('');
            return true;
        }
    }

    const registracijaKorisnika = async () => {
        if(validacijaKorime() && validacijaLozinka()) {
            if(await registrirajKorisnika(korime, lozinka))
                registriraj();
            else {
                setKorimeGreska(' ');
                setLozinkaGreska('Registracija nije uspjela');
            }
        }   
        
    }
  return (
    <div className='registracija'>
        <h1>Registracija</h1>

        <div className="registracija-forma">
            <div className='registracija-polje'>
                <label htmlFor="korime">Korisničko ime</label>
                <TekstualnoPolje 
                    naziv="korime"
                    validacija={validacijaKorime}
                    neispravanUnos={korimeGreska.length !== 0}
                    promjena={(korime) => setKorime(korime)}
                    poruka="1-15 znakova"
                />
            {korimeGreska && <div className="poruka-greske">{korimeGreska}</div>}
            {!korimeGreska && <div className="pozicija-greske"></div>} 
            </div>

            
            <div className='registracija-polje'>
                <label htmlFor="lozinka">Lozinka</label>
                <TekstualnoPolje 
                    naziv="lozinka"
                    validacija={validacijaLozinka}
                    neispravanUnos={lozinkaGreska.length !== 0}
                    promjena={(lozinka) => setLozinka(lozinka)}
                    poruka="Minimalno 8 znakova"
                    lozinka
                />
            {lozinkaGreska && <div className="poruka-greske">{lozinkaGreska}</div>}
            {!lozinkaGreska && <div className="pozicija-greske"></div>} 
            </div>

            <Gumb tekst="Registriraj" poziv={registracijaKorisnika}/>

        </div>

        
        <p className='registracija-poveznica' onClick={() => {navigacija('/prijava')}}>Povratak na prijavu</p> 
            
    </div>
  )
}

Registracija.propTypes = {
    registriraj: PropTypes.func
}

export default Registracija