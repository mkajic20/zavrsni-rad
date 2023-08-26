export const prijaviKorisnika = async (korime, lozinka) => {
  const odgovor = await fetch("/api/korisnici/prijava", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      korime,
      lozinka,
    }),
  });

  if (odgovor.ok) {
    const podaci = await odgovor.json(odgovor.body);
    localStorage.setItem("korisnik", podaci.korisnikId);
    localStorage.setItem("jwt", podaci.token);
    return true;
  } else {
    return false;
  }
};

export const registrirajKorisnika = async (korime, lozinka) => {
  const odgovor = await fetch("/api/korisnici/registracija", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      korime,
      lozinka,
    }),
  });

  if (odgovor.ok) {
    const podaci = await odgovor.json(odgovor.body);
    localStorage.setItem("korisnik", podaci.korisnikId);
    localStorage.setItem("jwt", podaci.token);
    return true;
  } else {
    return false;
  }
};

export const odjaviKorisnika = () => {
  localStorage.removeItem("korisnik");
  localStorage.removeItem("jwt");
};

export const provjeriKorisnika = () => {
  return (
    localStorage.getItem("korisnik") !== null &&
    localStorage.getItem("jwt") !== null
  );
};
