export const formatirajDatum = (datum) => {
    const dan = datum.getDate().toString().padStart(2, '0');
    const mjesec = (datum.getMonth() + 1).toString().padStart(2, '0');
    const godina = datum.getFullYear();
    return `${dan}.${mjesec}.${godina}`;
}