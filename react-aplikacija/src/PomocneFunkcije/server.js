//PRIJAVA, REGISTRACIJA, ODJAVA
//---------------------------------------------

export const prijaviKorisnika = async (korime, lozinka) => {
    //TODO: provjeriti korisnika na serveru
    //TODO: vratiti id i token za korisnika te ih spremiti u localStorage

    const odgovor = await fetch('/api/prijava', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      korime,
      lozinka,
    }),
  });

  if (odgovor.ok) {
    //TODO: postaviti id i token u localStorage
    return true;
  } else {
    return false
  }
    
}

export const registrirajKorisnika = async (korime, lozinka) => {
    //TODO: kreirati novog korisnika na serveru

    //TODO: za kreiranog korisnika odmah kreirati kategorije biljeski 'Favoriti' i 'Sve biljeske'
    //ili implementirati da su kreirani jednom za sve korisnike, te kada se dohvacaju sve kategorije za korisnika takoder se dohvate i te kategorije
    
    //TODO: vratiti id i token za korisnika te ih spremiti u localStorage
    if(korime !== 'korisnik'){
        return true;
    } else {
        return false;
    }
}

export const odjaviKorisnika = () => {
    //TODO: obrisati token i id korisnika iz localStorage
}


//TRAJNI ZADACI
//---------------------------------------------

export const dohvatiTrajneZadatke = async () => {
    //TODO: dohvati podatke sa servera
    const zadaci = 
    [{ id: 1, naslov: 'Zadatak 1', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 2, naslov: 'Zadatak 2', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 3, naslov: 'Zadatak 3', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 4, naslov: 'Zadatak 4', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 5, naslov: 'Zadatak 5', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 6, naslov: 'Zadatak 6', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 7, naslov: 'Zadatak 7', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 8, naslov: 'Zadatak 8', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: true},
    { id: 9, naslov: 'Zadatak 9', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 10, naslov: 'Zadatak 10', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 11, naslov: 'Zadatak 11', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 12, naslov: 'Zadatak 12', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 13, naslov: 'Zadatak 13', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 14, naslov: 'Zadatak 14', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 15, naslov: 'Zadatak 15', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},
    { id: 16, naslov: 'Zadatak 16', opis: 'Opis opis opis opis opis opis Opis opis opis opis opis opis', zavrsen: false},];

    return zadaci;
}

export const kreirajTrajniZadatak = async (naslov, opis) => {
    //TODO: kreirati trajni zadatak na serveru te returnati novo kreirani zadatak
    const noviZadatak = null;
    return noviZadatak;
}

export const promijeniStanjeTrajnogZadatka = async (id, novoStanje) => {
    //TODO: promijeniti stanje trajnog zadatka na serveru
}

export const obrisiTrajniZadatak = async (id) => {
    //TODO: obrisati trajni zadatak na serveru
}


//TJEDNI ZADACI
//---------------------------------------------

export const dohvatiTjedneZadatke = async () => {
    //TODO: dohvatiti podatke sa servera
    const zadaci = [
        {id: 1, naslov: 'Zadatak 1', opis: 'Opis 1', zavrsen: false},
        {id: 2, naslov: 'Zadatak 2', opis: 'Opis 2', zavrsen: false},
        {id: 3, naslov: 'Zadatak 3', opis: 'Opis 3', zavrsen: false},
        {id: 4, naslov: 'Zadatak 4', opis: 'Opis 4', zavrsen: false},
        {id: 5, naslov: 'Zadatak 5', opis: 'Opis 5', zavrsen: false},
        {id: 6, naslov: 'Zadatak 6', opis: 'Opis 6', zavrsen: false},
        {id: 7, naslov: 'Zadatak 7', opis: 'Opis 7', zavrsen: false},
        {id: 8, naslov: 'Zadatak 8', opis: 'Opis 8', zavrsen: false},
        {id: 9, naslov: 'Zadatak 9', opis: 'Opis 9', zavrsen: false},
        {id: 10, naslov: 'Zadatak 10', opis: 'Opis 10', zavrsen: false},
        {id: 11, naslov: 'Zadatak 11', opis: 'Opis 11', zavrsen: false},
        {id: 12, naslov: 'Zadatak 12', opis: 'Opis 12', zavrsen: false},
      ];
    return zadaci;
}

export const dohvatiTjednePodatke = async (tjedan) => {

    //TODO: dohvatiti podatke sa servera

    if (tjedan === '07.08.2023 - 13.08.2023') {
        return [
            {id: 1, postavljeno: true},
            {id: 5, postavljeno: true},
            {id: 8, postavljeno: true},
        ];
    }

    if (tjedan === '31.07.2023 - 06.08.2023') {
        return [
            {id: 2, postavljeno: true},
            {id: 3, postavljeno: true},
            {id: 4, postavljeno: true},
            {id: 6, postavljeno: true},
        ];
    }

    return null;
}

export const promijeniStanjeTjednogZadatka = async (id, postavljeno, tjedan) => {
    if(postavljeno){
        //TODO: dodaj podatak u tablici sa stanjem zadataka za taj tjedan i zadatak
    } else {
        //TODO: izbriši podatak iz tablice sa stanjem zadataka za taj tjedan i zadatak
    }
}

export const kreirajTjedniZadatak = async (naslov, opis) => {
    //TODO: kreirati tjedni zadatak na serveru te returnati novo kreirani zadatak
    const noviZadatak = null;
    return noviZadatak;
}

export const obrisiTjedniZadatak = async (id) => {
    //TODO: obrisati zadatak sa zadanim id-em sa servera
}


//DNEVNI ZADACI
//---------------------------------------------

export const dohvatiDnevneZadatke = async () => {
    //TODO: dohvatiti podatke sa servera
    const zadaci = [
      {id: 1, naslov: 'Zadatak 1', opis: 'Opis 1'},
      {id: 2, naslov: 'Zadatak 2', opis: 'Opis 2'},
      {id: 3, naslov: 'Zadatak 3', opis: 'Opis 3'},
      {id: 4, naslov: 'Zadatak 4', opis: 'Opis 4'},
      {id: 5, naslov: 'Zadatak 5', opis: 'Opis 5'},
      {id: 6, naslov: 'Zadatak 6', opis: 'Opis 6'},
      {id: 7, naslov: 'Zadatak 7', opis: 'Opis 7'},
      {id: 8, naslov: 'Zadatak 8', opis: 'Opis 8'},
      {id: 9, naslov: 'Zadatak 9', opis: 'Opis 9'},
      {id: 10, naslov: 'Zadatak 10', opis: 'Opis 10'},
      {id: 11, naslov: 'Zadatak 11', opis: 'Opis 11'},
      {id: 12, naslov: 'Zadatak 12', opis: 'Opis 12'},
    ];

    return zadaci;
}
 
export const dohvatiDnevnePodatke = async (datum) => {
    //TODO: dohvatiti podatke sa servera

    if (datum === '13.08.2023') {
        return [
            {id: 1, postavljeno: true},
            {id: 5, postavljeno: true},
            {id: 8, postavljeno: true},
        ];
    }

    if (datum === '12.08.2023') {
        return [
            {id: 2, postavljeno: true},
            {id: 3, postavljeno: true},
            {id: 4, postavljeno: true},
            {id: 6, postavljeno: true},
        ];
    }

    if (datum === '11.08.2023') {
        return [
            {id: 5, postavljeno: true},
            {id: 6, postavljeno: true},
            {id: 7, postavljeno: true},
            {id: 8, postavljeno: true},
        ];
    }

    return null;
}

export const promijeniStanjeDnevnogZadatka = async (id, postavljeno, dan) => {
    if(postavljeno){
        //TODO: dodaj podatak u tablici sa stanjem zadataka za taj dan i zadatak
    } else {
        //TODO: izbriši podatak iz tablice sa stanjem zadataka za taj dan i zadatak
    }
}

export const kreirajDnevniZadatak = async (naslov, opis) => {
    //TODO: kreirati dnevni zadatak na serveru te returnati novo kreirani zadatak
    const noviZadatak = null;
    return noviZadatak;
}

export const obrisiDnevniZadatak = async (id) => {
    //TODO: obrisati zadatak sa zadanim id-em sa servera
}


//PROJEKTI
//---------------------------------------------

export const dohvatiPopisProjekata = async () => {
    //TODO: dohvatiti popis projekata sa servera
    return [
        {id: 1, naziv: 'Projekt 1'},
        {id: 2, naziv: 'Projekt 2'},
        {id: 3, naziv: 'Projekt 3'},
    ];
}

export const dohvatiStanjaZavrsenosti = async () => {
    //TODO: dohvatiti stanja zavrsenosti sa servera (napraviti zasebnu tablicu za sva stanja zavrsenosti)
    return [
        {id: 1, naziv: 'Nije započeto'},
        {id: 2, naziv: 'Izvršava se'},
        {id: 3, naziv: 'Završeno'},
        {id: 4, naziv: 'Odgođeno'},
        {id: 5, naziv: 'Odbačeno'},
    ]
}

export const dohvatiProjekt = async (idProjekta) => {
    //TODO: dohvatiti zadatke za projekt sa zadanim id-em sa servera
    if(Number(idProjekta) === 1){
        return {
            naziv: 'Projekt 1',
            zadaci: [
                {id: 1, naslov: "Zadatak 1", opis: "Opis 1", stanje: 2},
                {id: 2, naslov: "Zadatak 2", opis: "Opis 2", stanje: 2},
                {id: 3, naslov: "Zadatak 3", opis: "Opis 3", stanje: 1},
                {id: 4, naslov: "Zadatak 4", opis: "Opis 4", stanje: 3},
                {id: 5, naslov: "Zadatak 5", opis: "Opis 5", stanje: 3},
                {id: 6, naslov: "Zadatak 6", opis: "Opis 6", stanje: 3},
                {id: 7, naslov: "Zadatak 7", opis: "Opis 7", stanje: 4},
            ]};
    } else if(Number(idProjekta) === 2){
        return {
            naziv: 'Projekt 2',
            zadaci: [
                {id: 1, naslov: "Zadatak 1", opis: "Opis 1", stanje: 3},
                {id: 2, naslov: "Zadatak 2", opis: "Opis 2", stanje: 3},
                {id: 3, naslov: "Zadatak 3", opis: "Opis 3", stanje: 2},
                {id: 4, naslov: "Zadatak 4", opis: "Opis 4", stanje: 5},
                {id: 5, naslov: "Zadatak 5", opis: "Opis 5", stanje: 5},
                {id: 6, naslov: "Zadatak 6", opis: "Opis 6", stanje: 3},
                {id: 7, naslov: "Zadatak 7", opis: "Opis 7", stanje: 4},
            ]};
    } else {
        return {
            naziv: 'Projekt 3',
            zadaci: []
        };
    }
}

export const kreirajProjekt = async (naziv) => {
    //TODO: kreirati projekt na serveru te returnati novo kreirani projekt
    const noviProjekt = null;
    return noviProjekt;
}

export const brisanjeProjekta = async (id) => {
    //TODO: obrisati projekt sa zadanim id-em sa servera
}

export const kreirajProjektniZadatak = async (naslov, opis, stanje) => {
    //TODO: dodati projektni zadatak na serveru te ga vratiti
    const noviZadatak = null;
    return noviZadatak;
}

export const promijeniStanjeProjektnogZadatka = async (id, novoStanje) => {
    //TODO: promijeniti stanje projektnog zadatka na serveru
}

//BILJESKE
//---------------------------------------------


export const dohvatiKategorijeBiljeski = async () => { 
    //TODO: dohvatiti kategorije biljeski sa servera
    const kategorije = [
        {id: 1, naziv: 'Favoriti'},
        {id: 2, naziv: 'Kategorija 2'},
        {id: 3, naziv: 'Kategorija 3'},
        {id: 4, naziv: 'Kategorija 4'},
        {id: 9999, naziv: 'Sve biljeske'},
    ];
    return kategorije;
}

export const dohvatiBiljeske = async () => {

    //TODO: dohvatiti podatke sa servera, te ih na serveru spojiti sa kategorijama biljeski (kako bi se morao raditi samo jedan poziv)

    const biljeske = [
        {id: 1, naslov: 'Biljeska 1', sadrzaj: 'Sadrzaj 1'},
        {id: 2, naslov: 'Biljeska 2', sadrzaj: 'Sadrzaj 2'},
        {id: 3, naslov: 'Biljeska 3', sadrzaj: 'Sadrzaj 3'},
        {id: 4, naslov: 'Biljeska 4', sadrzaj: 'Sadrzaj 4'},
        {id: 5, naslov: 'Biljeska 5', sadrzaj: 'Sadrzaj 5'},
    ]

    const kategorijeBiljeski = [
        {id: 1, idBiljeske: 1, idKategorije: 1},
        {id: 2, idBiljeske: 2, idKategorije: 1},
        {id: 3, idBiljeske: 5, idKategorije: 1},

        {id: 4, idBiljeske: 1, idKategorije: 2},
        {id: 5, idBiljeske: 3, idKategorije: 2},
        {id: 6, idBiljeske: 4, idKategorije: 2},


        {id: 7, idBiljeske: 2, idKategorije: 3},
        {id: 8, idBiljeske: 5, idKategorije: 3},
        

        {id: 9, idBiljeske: 1, idKategorije: 9999},
        {id: 10, idBiljeske: 2, idKategorije: 9999},
        {id: 11, idBiljeske: 3, idKategorije: 9999},
        {id: 12, idBiljeske: 4, idKategorije: 9999},
        {id: 13, idBiljeske: 5, idKategorije: 9999},
    ]

    //TODO: kod spajanja uzeti samo id kategorije umjesto cijelog objekta, prilagoditi komponentu da tako radi
    const spojeniPodaci = biljeske.map(biljeska => {
        const zajednickeKategorije = kategorijeBiljeski.filter(kategorija => kategorija.idBiljeske === biljeska.id);
        const favorit = zajednickeKategorije.some(kategorija => kategorija.idKategorije === 1);
        
        return {
            ...biljeska,
            kategorije: zajednickeKategorije,
            favorit: favorit
        };
    });
    

    return spojeniPodaci;
}

export const promijeniFavorita = async (id, novoStanje) => {
    if(novoStanje) {
        //TODO: dodaj novi zapis u tablicu koja povezuje kategorije i biljeske, koristeci proslijedeni id i id kategorije Favoriti (1)
    } else {
        //TODO: obrisi zapis tablice koji povezuje tu biljesku i kategoriju Favoriti
    }
}

export const kreirajKategorijuBiljeski = async (naziv) => {
    //TODO: kreirati kategoriju na serveru te returnati novo kreiranu kategoriju
    const novaKategorija = null;
    return novaKategorija;
}

export const dohvatiBiljeskeFavorite = async () => {
    //TODO: dohvatiti favorite sa servera
    return [
        {id: 1, naslov: 'Biljeska 1', sadrzaj: 'Sadrzaj 1'},
        {id: 2, naslov: 'Biljeska 2', sadrzaj: 'Sadrzaj 2'},
        {id: 5, naslov: 'Biljeska 5', sadrzaj: 'Sadrzaj 5'},
    ];    
}

export const dohvatiBiljesku = async (id) => {
    //TODO: dohvatiti biljesku sa servera, kao i njene kategorije

    const biljeske = [
        {id: 1, naslov: 'Biljeska 1', sadrzaj: 'Sadrzaj 1', kategorije: [1, 2, 9999]},
        {id: 2, naslov: 'Biljeska 2', sadrzaj: 'Sadrzaj 2', kategorije: [1, 3, 9999]},
        {id: 3, naslov: 'Biljeska 3', sadrzaj: 'Sadrzaj 3', kategorije: [2, 9999]},
        {id: 4, naslov: 'Biljeska 4', sadrzaj: 'Sadrzaj 4', kategorije: [2, 9999]},
        {id: 5, naslov: 'Biljeska 5', sadrzaj: 'Sadrzaj 5', kategorije: [1, 3, 9999]},
    ]
    
    return biljeske.find(biljeska => biljeska.id === Number(id));
}

export const azurirajSadrzajBiljeske = async (id, sadrzaj) => {
    //TODO: azurirati sadrzaj biljeske na serveru
}

export const azurirajKategorijuBiljeske = async (idBiljeske, idKategorije, kategorijaPostoji) => {
    if(kategorijaPostoji){
        //TODO: ukloniti kategoriju sa biljeske na serveru
    } else {
        //TODO: dodati kategoriju biljesci na serveru
    }
}