import "../stylesheets/BeehivesPreview.css";
import {Beehive} from "../types/Beehive.ts";
import {Link} from "react-router-dom";

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
                        <Link to={"/beehive/" + beehive.id}><img src="src/assets/beehive_preview.png" alt="Logo"/>
                        </Link>
                    </div>
                    <div className="description">
                        <Link to={"/beehive/" + beehive.id}><h3>{beehive.name}</h3>
                        </Link>
                        <p>{beehive.type}</p>
                        <p className="dateTime">Update: {beehive.dateTime}</p>
                    </div>
                </article>
                ))}
        </div>
    )
}
