export default async function getRandomImages(count)
{
    const imageUrls = await fetchImages().then(data => data.hits);
    const selectedImages = [];

    for (let i = 0; i < count; i++)
    {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        selectedImages.push(imageUrls[randomIndex].largeImageURL);
        imageUrls.splice(randomIndex, 1);
    }
    
    return selectedImages;
}

async function fetchImages()
{
    const url = new URL("https://pixabay.com/api/");

    url.searchParams.append("key", "15015852-74ad25fb66baa6531c44a804c");
    url.searchParams.append("q", "");
    url.searchParams.append("image_type", "vector");
    url.searchParams.append("safesearch", true);

    const response = await fetch(url, {method: "GET"});
    return await response.json();
}

