import React, { useState } from "react";
import PropTypes from "prop-types";
import "./PadajuciIzbornik.scss";
import ikonaStrelica from "../../Resursi/strelica.png";

const PadajuciIzbornik = ({ naslov, children }) => {
  const [otvoren, setOtvoren] = useState(false);
  return (
    <div className="padajuci-izbornik">
      <div
        className="padajuci-izbornik-gumbi"
        onClick={() => setOtvoren(!otvoren)}
      >
        <span>{naslov}</span>
        <img
          className="padajuci-izbornik-slika"
          src={ikonaStrelica}
          alt="strelica"
          width={20}
        />
      </div>

        {otvoren && 
            <div className="padajuci-izbornik-djeca">
                {children}
            </div>
        }
      
    </div>
  );
};

PadajuciIzbornik.propTypes = {};

export default PadajuciIzbornik;
