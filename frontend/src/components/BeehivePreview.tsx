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
        <div id="container">
            <Header/>
            <div>
            {props.beehives.map((beehive: Beehive) => (
                <article id="beehives-container" key={beehive.id}>
                    <p>{beehive.name}</p>
                    <p>{beehive.dateTime}</p>
                    <p>{beehive.type}</p>
                </article>
            ))}
            </div>
        </div>

    )
}