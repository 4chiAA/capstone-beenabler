import "../stylesheets/BeehivesPreview.css";
import {Beehive} from "../types/Beehive.ts";

type BeehivePreviewProps = {
    beehives: Beehive[]
}

export default function BeehivesPreview(props: Readonly<BeehivePreviewProps>) {

    if (props.beehives.length === 0) {
        return ("Du hast noch kein Bienenvolk angelegt")
    }

    return (
        <div className="beehives-preview-container">
                {props.beehives.map((beehive: Beehive) => (
                <article className="beehives-preview"  key={beehive.id}>
                    <div className="logo">
                        <img src="src/assets/beehive_preview.png" alt="Logo"/>
                    </div>
                    <div className="description">
                        <h3>{beehive.name}</h3>
                        <p>{beehive.type}</p>
                        <p className="dateTime">Update: {beehive.dateTime}</p>
                    </div>
                </article>
                ))}
        </div>
    )
}
