import "../stylesheets/BeehivePreview.css";
import {Beehive} from "../types/Beehive.ts";
import Header from "./Header.tsx";

type BeehivePreviewProps = {
    beehives: Beehive[]
}

export default function BeehivePreview(props: Readonly<BeehivePreviewProps>) {

    if (props.beehives.length === 0) {
        return ("Du hast noch kein Bienenvolk angelegt")
    }

    return (
        <div className="container">
            <Header/>
            <div className="title-container">
                <h2>Deine Bienenvölker</h2>
                <div className="divider"></div>
            </div>
            <div className="beehives-container">
                {props.beehives.map((beehive: Beehive) => (
                <article className="beehives"  key={beehive.id}>
                    <div className="beehive-logo">
                        <img src="src/assets/beehive_preview.png" alt="Logo"/>
                    </div>
                    <div className="beehive-description">
                        <h3>{beehive.name}</h3>
                        <p>{beehive.type}</p>
                        <p>Update: {beehive.dateTime}</p>
                    </div>
                </article>
                ))}
            </div>
            <button>Add</button>
        </div>

    )
}