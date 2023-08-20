import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';

const ZasticenaPutanja = ({ispravan, children, putanja}) => {
    if (!ispravan) {
        return <Navigate to={putanja} replace />;
    } else {
        return children;
    }
}

ZasticenaPutanja.propTypes = {
    ispravan: PropTypes.bool,
    children: PropTypes.node
}

export default ZasticenaPutanja



