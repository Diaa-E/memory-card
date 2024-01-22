//Fisher–Yates Shuffle
export default function shuffleArray(cardsArray)
{
    let currentIndex = cardsArray.length;
    let randomIndex;

    while (currentIndex > 0)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cardsArray[currentIndex], cardsArray[randomIndex]] = [cardsArray[randomIndex], cardsArray[currentIndex]];
    }

    return cardsArray;
}