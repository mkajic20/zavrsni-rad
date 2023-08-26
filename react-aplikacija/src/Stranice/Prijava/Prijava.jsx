import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Prijava.scss'
import TekstualnoPolje from '../../Komponente/TekstualnoPolje/TekstualnoPolje';
import Gumb from '../../Komponente/Gumb/Gumb';
import { prijaviKorisnika } from '../../PomocneFunkcije/korisnici';
import { useNavigate } from 'react-router-dom';

const Prijava = ({prijavi}) => {
    const [korime, setKorime] = useState('');
    const [korimeGreska, setKorimeGreska] = useState('');
    const [lozinka, setLozinka] = useState('');
    const [lozinkaGreska, setLozinkaGreska] = useState('');

    const navigacija = useNavigate();

    const prijavaKorisnika = async () => {
        if(await prijaviKorisnika(korime, lozinka))
            prijavi();
        else {
            setKorimeGreska(' ');
            setLozinkaGreska('Korisničko ime ili lozinka nisu ispravni');
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