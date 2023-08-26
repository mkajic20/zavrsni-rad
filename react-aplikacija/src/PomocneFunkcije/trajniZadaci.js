export const dohvatiTrajneZadatke = async () => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");
  const odgovor = await fetch(`/api/zadaci/trajni-zadaci/${id}`, {
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

export const kreirajTrajniZadatak = async (naslov, opis) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  const odgovor = await fetch(`/api/zadaci/trajni-zadaci/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      naslov,
      opis,
    }),
  });

  if (odgovor.ok) {
    const podaci = await odgovor.json(odgovor.body);
    return podaci;
  }
  return null;
};

export const promijeniStanjeTrajnogZadatka = async (zadatakId, novoStanje) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  await fetch(`/api/zadaci/trajni-zadaci/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      zadatakId: zadatakId,
      zavrsen: novoStanje,
    }),
  });
};

export const obrisiTrajniZadatak = async (zadatakId) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  await fetch(`/api/zadaci/trajni-zadaci/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      id: zadatakId,
    }),
  });
};
