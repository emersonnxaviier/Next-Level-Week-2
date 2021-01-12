/*
 ex: 8:00, a função vai pegar cada número da hora passada que está definido como string, 
    separar quando encontrar os dois pontos e transformar em um array do tipo numerico.
*/
export default function convertHourToMinutes(time: string) {
    const [hour, minutes] = time.split(':').map(Number)
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}