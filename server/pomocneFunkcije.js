exports.provjeriLozinku = function(lozinka, enkriptiranaLozinka){
    return lozinka === enkriptiranaLozinka;
}

exports.enkripcijaLozinke = function(lozinka){
    return lozinka;
}

exports.provjeriJWT = function(jwt){}