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

    return cards.cards.map(card => {return {id: card.code, image: card.image}});
}