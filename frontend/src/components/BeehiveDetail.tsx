import "../stylesheets/BeehiveDetail.css"
import {Beehive} from "../types/Beehive.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import BeehiveDeleteButton from "./BeehiveDeleteButton.tsx";
import BeehiveUpdateButton from "./BeehiveUpdateButton.tsx";

type BeehiveDetailProps = {
    beehive: Beehive | undefined | null
    getBeehiveById: (id: string) => void
}

export default function BeehiveDetail(props: Readonly<BeehiveDetailProps>) {

    const {id} = useParams();

    useEffect(() => {
        props.getBeehiveById(String(id))
    }, [id, props]);

    if (props.beehive === undefined) {
        return ("lade...");
    } else if (props.beehive === null) {
        return ("Kein Bienenvolk mit dieser ID vorhanden")
    }

    return (
        <div className="beehive-container">
            <div className="logo">
                <img src="/src/assets/beehive_preview.png" alt="Logo"/>
            </div>
                <article className="beehive">
                    <h3>{props.beehive.name}</h3>
                    <p>{props.beehive.type}</p>
                    <p>Standort: {props.beehive.location}</p>
                    <p className="dateTime">Update: {props.beehive.dateTime}</p>
                </article>
            <div className="beehive-buttons">
                <BeehiveDeleteButton beehive={props.beehive}/>
                <BeehiveUpdateButton beehive={props.beehive}/>
            </div>

        </div>
    )
}
