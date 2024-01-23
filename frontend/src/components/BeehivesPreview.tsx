import "../stylesheets/BeehivesPreview.css";
import {Beehive} from "../types/Beehive.ts";
import {Link} from "react-router-dom";
import BeehiveDeleteButton from "./BeehiveDeleteButton.tsx";
import BeehiveUpdateButton from "./BeehiveUpdateButton.tsx";

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
                    <div className="beehives-preview" key={beehive.id}>
                        <div className="left-part">
                            <Link to={"/beehive/" + beehive.id}>
                                <div className="logo">
                                    <img src="/src/assets/beehive_preview.png" alt="Logo"/>
                                </div>
                            </Link>
                            <div className="buttons">
                                <BeehiveDeleteButton beehive={beehive}/>
                                <BeehiveUpdateButton beehive={beehive}/>
                            </div>
                        </div>
                        <article className="right-part">
                            <Link to={"/beehive/" + beehive.id} style={{textDecoration: "none", color: "inherit"}}>
                                <div className="description">
                                    <h3>{beehive.name}</h3>
                                    <p>{beehive.type}</p>
                                    <p className="dateTime">Update: {beehive.dateTime}</p>
                                </div>
                            </Link>
                        </article>
                    </div>
                ))}
        </div>
    )
}
