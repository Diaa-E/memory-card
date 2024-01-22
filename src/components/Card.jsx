import "../styles/Card.css";
import { useState } from "react";

export default function Card({id, imgSrc, imgText, clicked, onClick})
{
    return ( 
        <div>
            <img src={imgSrc} alt={`${imgText}'s image`} />
            <p onClick={() => onClick(id)}>{imgText}</p>
        </div>
    )
}