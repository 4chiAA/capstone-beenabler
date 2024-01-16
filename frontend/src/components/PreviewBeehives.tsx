import "../stylesheets/PreviewBeehives.css";
import {Beehive} from "../types/Beehive.ts";

type BeehivePreviewProps = {
    beehives: Beehive[]
}

export default function PreviewBeehives(props: Readonly<BeehivePreviewProps>) {

    if (props.beehives.length === 0) {
        return ("Du hast noch kein Bienenvolk angelegt")
    }

    return (
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
    )
}