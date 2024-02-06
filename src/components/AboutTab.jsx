import "../styles/Tabs.css";

export default function AboutTab({enabled, closeDialog})
{
    if (!enabled) return <></>

    return (
        <div className="tab">
            <p>Memory Cards v1.0.2</p>
            <p>Visit project's repo <a href="https://github.com/Diaa-E/memory-card">Memory Cards repo</a></p>
            <p>Created by Diaa-E <a href="https://github.com/Diaa-E/">Diaa-E on Github</a></p>
        </div>
    )
}