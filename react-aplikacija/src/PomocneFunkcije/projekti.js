export const dohvatiPopisProjekata = async () => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");
  const odgovor = await fetch(`/api/projekti/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  });

  if (odgovor.ok) {
    const podaci = await odgovor.json(odgovor.body);
    return podaci;
  }
  return null;
};

export const dohvatiStanjaZavrsenosti = async () => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  const odgovor = await fetch(`/api/projekti/stanja-zavrsenosti/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  });

  if (odgovor.ok) {
    const podaci = await odgovor.json(odgovor.body);
    return podaci;
  }
  return null;
};

export const dohvatiProjekt = async (idProjekta) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");
  const odgovor = await fetch(`/api/projekt/${id}?id=${idProjekta}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  });

  if (odgovor.ok) {
    const podaci = await odgovor.json(odgovor.body);
    return podaci;
  }
  return null;
};

export const kreirajProjekt = async (naziv) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  const odgovor = await fetch(`/api/projekti/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      naziv,
    }),
  });

  if (odgovor.ok) {
    const podaci = await odgovor.json(odgovor.body);
    return podaci;
  }
  return null;
};

export const brisanjeProjekta = async (idProjekta) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  await fetch(`/api/projekti/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      id: idProjekta,
    }),
  });
};

export const kreirajProjektniZadatak = async (
  idProjekta,
  naslov,
  opis,
  stanje
) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  const odgovor = await fetch(`/api/projekt/projektni-zadaci/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      id: idProjekta,
      naslov,
      opis,
      stanje,
    }),
  });

  if (odgovor.ok) {
    const podaci = await odgovor.json(odgovor.body);
    return podaci;
  }
  return null;
};

export const promijeniStanjeProjektnogZadatka = async (
  idZadatka,
  novoStanje
) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  await fetch(`/api/projekt/projektni-zadaci/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      id: idZadatka,
      stanje: novoStanje,
    }),
  });
};
