import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Prijava.scss'
import TekstualnoPolje from '../../Komponente/TekstualnoPolje/TekstualnoPolje';
import Gumb from '../../Komponente/Gumb/Gumb';
import { prijaviKorisnika } from '../../PomocneFunkcije/server';
import { useNavigate } from 'react-router-dom';

const Prijava = ({prijavi}) => {
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

    const prijavaKorisnika = async () => {
        if(validacijaKorime() && validacijaLozinka()) {
            if(await prijaviKorisnika(korime, lozinka))
                prijavi();
            else {
                setKorimeGreska(' ');
                setLozinkaGreska('Korisničko ime ili lozinka nisu ispravni');
            }
        }   
        
    }


  return (
    <div className='prijava'>
        <h1>Prijava</h1>

        <div className="prijava-forma">
            <div className='prijava-polje'>
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

            
            <div className='prijava-polje'>
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

            <Gumb tekst="Prijava" poziv={prijavaKorisnika}/>

        </div>

        
        <p className='prijava-poveznica' onClick={() => {navigacija('/registracija')}}>Nemate korisnički račun? Registrirajte se</p> 
            
    </div>
  )
}

Prijava.propTypes = {
    prijavi: PropTypes.func
}

export default Prijava