import "../stylesheets/BeehivesPreview.css";
import {Beehive} from "../types/Beehive.ts";
import {Link} from "react-router-dom";
import BeehiveDeleteButton from "./BeehiveDeleteButton.tsx";
import BeehiveUpdateButton from "./BeehiveUpdateButton.tsx";
import beehivePreview from "../assets/beehive_preview.png";
import {useEffect, useState} from "react";
import axios from "axios";

export default function BeehivesPreview() {

    const [beehivesPreview, setBeehivesPreview] = useState<Beehive[]>([])

    useEffect(() => {
        getAllBeehives();
    }, []);

    function getAllBeehives() {
        axios.get("/api/beehives")
            .then(response => setBeehivesPreview(response.data))
            .catch((error: Error) => console.error(error));
    }

    if (beehivesPreview.length === 0) {
        return ("Du hast noch kein Bienenvolk angelegt")
    }

    return (
        <div className="beehives-preview-container">
                {beehivesPreview.map((beehive: Beehive) => (
                    <div className="beehives-preview" key={beehive.id}>
                        <div className="left-part">
                            <Link to={"/beehive/" + beehive.id}>
                                <div className="logo">
                                    <img src={beehivePreview} alt="Logo"/>
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
