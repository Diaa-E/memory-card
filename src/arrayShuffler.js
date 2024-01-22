//Fisher–Yates Shuffle
export default function shuffleArray(array)
{
    let randomIndex;

    for (let i = 0; i < array.length; i++)
    {
        randomIndex = Math.ceil(Math.random() * i);
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
}