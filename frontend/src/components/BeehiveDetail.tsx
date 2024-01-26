import "../stylesheets/BeehiveDetail.css"
import {Beehive} from "../types/Beehive.ts";
import {useEffect, useState} from "react";
import BeehiveDeleteButton from "./BeehiveDeleteButton.tsx";
import BeehiveUpdateButton from "./BeehiveUpdateButton.tsx";
import beehivePreview from "../assets/beehive_preview.png";
import {useParams} from "react-router-dom";
import getBeehiveById from "../service/apiService.ts";

export default function BeehiveDetail() {

    const {id} = useParams();
    const [beehive, setBeehive] = useState<Beehive | undefined | null>(undefined)

    useEffect(() => {
        getBeehiveById(String(id), setBeehive)
    }, [id]);

    if (beehive === undefined) {
        return ("lade...");
    } else if (beehive === null) {
        return ("Kein Bienenvolk mit dieser ID vorhanden")
    }

    return (
        <div className="beehive-container">
            <div className="logo">
                <img src={beehivePreview} alt="Logo"/>
            </div>
                <article className="beehive">
                    <h3>{beehive.name}</h3>
                    <p>{beehive.type}</p>
                    <p>Standort: {beehive.location}</p>
                    <p className="dateTime">Update: {beehive.dateTime}</p>
                </article>
            <div className="beehive-buttons">
                <BeehiveDeleteButton beehive={beehive}/>
                <BeehiveUpdateButton beehive={beehive}/>
            </div>
        </div>
    )
}
