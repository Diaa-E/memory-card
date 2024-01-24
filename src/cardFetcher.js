export default async function getRandomCards(count)
{
    return await fetchCards(count)
}

async function fetchCards(count)
{
    const deckResponse = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const deck = await deckResponse.json();
    const cardsResponse = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=${count}`);
    const cards = await cardsResponse.json();

    return loadImages(cards.cards);
}

async function loadImages(imagesData)
{
    const promiseArray = [];
    const loadedImagesData = [];

    for (let item of imagesData)
    {
        promiseArray.push(new Promise(resolve => {

            const image = new Image();
            image.onload = () => { resolve(); };

            image.src = item.image;
            loadedImagesData.push({id: item.code, image: image});
        }));
    }

    await Promise.all(promiseArray);

    return loadedImagesData;
}