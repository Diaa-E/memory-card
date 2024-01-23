export default async function getRandomImages(count)
{
    const selectedImages = [];

    const response = await fetchImages("symbol");

    for (let i = 0; i < count; i++)
    {
        const randomIndex = Math.floor(Math.random() * response.hits.length);
        selectedImages.push(response.hits[randomIndex].largeImageURL);
        response.hits.splice(randomIndex, 1);
    }

    return selectedImages;
}

async function fetchImages(query = "")
{
    const url = new URL("https://pixabay.com/api/");

    url.searchParams.append("key", "15015852-74ad25fb66baa6531c44a804c");
    url.searchParams.append("q", query);
    url.searchParams.append("image_type", "illustration");
    url.searchParams.append("safesearch", true);
    url.searchParams.append("orientation", "vertical");
    url.searchParams.append("colors", ["grayscale", "transparent"]);
    url.searchParams.append("per_page", 200);

    const response = await fetch(url, {method: "GET"});
    return await response.json();
}

