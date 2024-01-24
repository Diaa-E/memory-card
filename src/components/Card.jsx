import "../styles/Card.css";

export default function Card({id, imgSrc, onClick})
{
    return ( 
        <div>
            <img onClick={() => onClick(id)} src={imgSrc.src} alt="card's image" />
        </div>
    )
}