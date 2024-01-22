import "../styles/Card.css";
import { useState } from "react";

export default function Card({imgSrc, imgText, clicked, onClick})
{
    return ( 
        <div>
            <img src={imgSrc} alt={`${imgText}'s image`} />
            <p onClick={onClick}>{imgText}</p>
        </div>
    )
}