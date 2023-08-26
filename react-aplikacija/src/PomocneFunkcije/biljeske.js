export const dohvatiKategorijeBiljeski = async () => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");
  const odgovor = await fetch(`/api/biljeske/kategorije/${id}`, {
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

export const dohvatiBiljeske = async () => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");
  const odgovor = await fetch(`/api/biljeske/${id}`, {
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

export const obrisiBiljesku = async (idBiljeske) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  await fetch(`/api/biljeske/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      id: idBiljeske,
    }),
  });
}

export const kreirajBiljesku = async (naziv) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  const odgovor = await fetch(`/api/biljeske/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      naslov: naziv,
    }),
  });

  if (odgovor.ok) {
    const podaci = await odgovor.json(odgovor.body);
    return podaci;
  }
  return null;
};

export const promijeniFavorita = async (idBiljeske, novoStanje) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");
  console.log(novoStanje);
  if (novoStanje) {
    await fetch(`/api/biljeske/kategorije-biljeski/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify({
        idBiljeske: idBiljeske,
        idKategorije: 1,
      }),
    });
  } else {
    await fetch(`/api/biljeske/kategorije-biljeski/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify({
        idBiljeske: idBiljeske,
        idKategorije: 1,
      }),
    });
  }
};

export const kreirajKategorijuBiljeski = async (naziv) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  const odgovor = await fetch(`/api/biljeske/kategorije/${id}`, {
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

export const dohvatiBiljeskeFavorite = async () => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");
  const odgovor = await fetch(`/api/biljeske/favoriti/${id}`, {
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

export const dohvatiBiljesku = async (idBiljeske) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");
  const odgovor = await fetch(`/api/biljeska/${id}?id=${idBiljeske}`, {
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

export const azurirajSadrzajBiljeske = async (idBiljeske, sadrzaj) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");

  await fetch(`/api/biljeske/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      id: idBiljeske,
      sadrzaj: sadrzaj,
    }),
  });
};

export const azurirajKategorijuBiljeske = async (
  idBiljeske,
  idKategorije,
  kategorijaPostoji
) => {
  const jwt = localStorage.getItem("jwt");
  const id = localStorage.getItem("korisnik");
  if (!kategorijaPostoji) {
    await fetch(`/api/biljeske/kategorije-biljeski/${id}`, {
     
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify({
        idBiljeske: idBiljeske,
        idKategorije: idKategorije,
      }),
    });
  } else {
    await fetch(`/api/biljeske/kategorije-biljeski/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify({
        idBiljeske: idBiljeske,
        idKategorije: idKategorije,
      }),
    });
  }
};
