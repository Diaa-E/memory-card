//Fisher–Yates Shuffle
export default function shuffleArray(array)
{
    let randomIndex;

    for (let i = array.length - 1; i > 0; i--)
    {
        randomIndex = Math.floor(Math.random() * i);
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
}