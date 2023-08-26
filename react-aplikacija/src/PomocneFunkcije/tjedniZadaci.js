export const dohvatiTjedneZadatke = async () => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");
  const odgovor = await fetch(`/api/zadaci/tjedni-zadaci/${id}`, {
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

export const dohvatiTjednePodatke = async (tjedan) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  const odgovor = await fetch(
    `/api/zadaci/tjedni-podaci/${id}?tjedan=${tjedan}`,
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

export const promijeniStanjeTjednogZadatka = async (
  idZadatka,
  postavljeno,
  tjedan
) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  if (postavljeno) {
    await fetch(`/api/zadaci/tjedni-podaci/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify({
        tjedan: tjedan,
        idZadatka: idZadatka,
      }),
    });
  } else {
    await fetch(`/api/zadaci/tjedni-podaci/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify({
        tjedan: tjedan,
        idZadatka: idZadatka,
      }),
    });
  }
};

export const kreirajTjedniZadatak = async (naslov, opis) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  const odgovor = await fetch(`/api/zadaci/tjedni-zadaci/${id}`, {
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

export const obrisiTjedniZadatak = async (zadatakId) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  await fetch(`/api/zadaci/tjedni-zadaci/${id}`, {
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
