import "../styles/LoadingScreen.css";
import cardBack from "../assets/images/card_back.png";
import cardFront from "../assets/images/card_front.png";

export default function LoadingScreen({enabled})
{
    if (!enabled) return <></>;

    return (
        <div className="loading-container">
            <div className="card-3d">
                <img src={cardBack} alt="card's back face"/>
                <img src={cardFront} alt="card's front face"/>
            </div>
            <p>Loading...</p>
        </div>
    )
}