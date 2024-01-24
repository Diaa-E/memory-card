import "../styles/Card.css";
import { useState } from "react";

export default function Card({id, imgSrc, imgText, clicked, onClick})
{
    return ( 
        <div>
            <img onClick={() => onClick(id)} src={imgSrc.src} alt={`${imgText}'s image`} />
            <p>{imgText}</p>
        </div>
    )
}