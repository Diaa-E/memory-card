import "../styles/ReadyScreen.css";

export default function ReadyScreen({enabled, onClick})
{
    if (!enabled) return <></>

    return (
        <>
            <button onClick={onClick} className="play-button">Play</button>
        </>
    )
}