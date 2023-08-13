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