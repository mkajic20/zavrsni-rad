export const dohvatiDnevneZadatke = async () => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");
  const odgovor = await fetch(`/api/zadaci/dnevni-zadaci/${id}`, {
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

export const dohvatiDnevnePodatke = async (datum) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  const odgovor = await fetch(
    `/api/zadaci/dnevni-podaci/${id}?datum=${datum}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    }
  );

  if (odgovor.ok) {
    const podaci = await odgovor.json(odgovor.body);
    return podaci;
  }
  return null;
};

export const promijeniStanjeDnevnogZadatka = async (
  idZadatka,
  postavljeno,
  dan
) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  if (postavljeno) {
    await fetch(`/api/zadaci/dnevni-podaci/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify({
        dan: dan,
        idZadatka: idZadatka,
      }),
    });
  } else {
    await fetch(`/api/zadaci/dnevni-podaci/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify({
        datum: dan,
        idZadatka: idZadatka,
      }),
    });
  }
};

export const kreirajDnevniZadatak = async (naslov, opis) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  const odgovor = await fetch(`/api/zadaci/dnevni-zadaci/${id}`, {
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

export const obrisiDnevniZadatak = async (zadatakId) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  await fetch(`/api/zadaci/dnevni-zadaci/${id}`, {
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
