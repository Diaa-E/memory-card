export default async function getRandomImages(count)
{
    const queries = [
        "Apple",
        "Joker",
        "Book",
        "Sword",
        "Woman",
        "Man",
        "geometry",
        "Jewel",
        "Pyramid",
        "Tree",
        "Knife",
        "Gun",
        "Wrench",
        "Burger",
        "Juice",
        "Soft Drink",
        "Car",
        "Bus",
        "Thief",
        "Clown",
        "Gold",
        "Camera",
        "Phone",
        "Computer",
    ];

    const selectedImages = [];

    for (let i = 0; i < count; i++)
    {
        const randomQueryIndex = Math.floor(Math.random() * queries.length);
        const query = queries[randomQueryIndex];
        queries.splice(randomQueryIndex, 1);

        const response = await fetchImages(query);
        const randomHitIndex = Math.floor(Math.random() * response.hits.length);
        selectedImages.push(response.hits[randomHitIndex].largeImageURL);
        console.log(response.hits[randomHitIndex].largeImageURL);
    }

    console.log(selectedImages)
    return selectedImages;
}

async function fetchImages(query = "")
{
    const url = new URL("https://pixabay.com/api/");

    url.searchParams.append("key", "15015852-74ad25fb66baa6531c44a804c");
    url.searchParams.append("q", query);
    url.searchParams.append("image_type", "vector");
    url.searchParams.append("safesearch", true);
    url.searchParams.append("orientation", "vertical");
    url.searchParams.append("colors", "grayscale");

    const response = await fetch(url, {method: "GET"});
    return await response.json();
}

