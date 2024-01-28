import { useState } from "react";
import "../styles/DifficultySelection.css";
import AboutTab from "./AboutTab";
import HelpTab from "./HelpTab";

export default function DifficultySelection({enabled, setDifficulty})
{
    const tabs = {
        none: "none",
        about: "about",
        help: "help"
    }
    const [activeTab, setActiveTab] = useState(tabs.none);

    function closeTab()
    {
        setActiveTab(tabs.none);
    }

    if (!enabled) return <></>

    return (
        <>
            <div className={`title-container ${activeTab === tabs.none? "" : "title-container-open"}`}>
                <button onClick={() => setActiveTab(tabs.help)} className='play-button about-button'>Help</button>
                <button
                    onClick={() => setActiveTab(tabs.none)}
                    className="play-button about-button title"
                >
                    {activeTab === tabs.none? "Memory Cards" : "Go Back"}
                </button>
                <button onClick={() => setActiveTab(tabs.about)} className='play-button about-button'>About</button>
            </div>
            <AboutTab enabled={activeTab === tabs.about} closeDialog={closeTab}/>
            <HelpTab enabled={activeTab === tabs.help} closeDialog={closeTab}/>
            <div className={`difficulty-container ${activeTab === tabs.none? "" : "invisible"}`}>
                <button onClick={() => setDifficulty(6)} className="play-button easy-button">Easy</button>
                <button onClick={() => setDifficulty(12)} className="play-button">Medium</button>
                <button onClick={() => setDifficulty(18)} className="play-button hard-button">Hard</button>
            </div>
        </>
    )
}