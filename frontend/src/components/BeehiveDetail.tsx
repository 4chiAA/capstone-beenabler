import "../stylesheets/BeehiveDetail.css"
import {Beehive} from "../types/Beehive.ts";
import {useEffect, useState} from "react";
import BeehiveDeleteButton from "./BeehiveDeleteButton.tsx";
import BeehiveUpdateButton from "./BeehiveUpdateButton.tsx";
import beehiveColonyIcon from "../assets/beehiveColonyIcon.png";
import {useParams} from "react-router-dom";
import getBeehiveById from "../service/apiService.ts";
import axios from "axios";
import {Entry} from "../types/Entry.ts";
import EntryCreateButton from "./EntryCreateButton.tsx";

export default function BeehiveDetail() {

    const {beehiveId} = useParams();
    const [beehive, setBeehive] = useState<Beehive | undefined | null>(undefined)
    const [entries, setEntries] = useState<Entry[]>([])

    useEffect(() => {
        getBeehiveById(String(beehiveId), setBeehive);
        getAllEntriesForBeehive(String(beehiveId))
    }, [beehiveId]);

    function getAllEntriesForBeehive(beehiveId: string) {
        axios.get("/api/entries/" + beehiveId)
            .then(response => setEntries(response.data))
            .catch((error: Error) => console.error(error));
    }

    if (beehive === undefined) {
        return ("lade...");
    } else if (beehive === null) {
        return ("Kein Bienenvolk mit dieser ID vorhanden")
    }

    return (
        <div>
            <div className="beehive-container">
                <div className="logo">
                    <img src={beehiveColonyIcon} alt="Logo"/>
                </div>

                <div className="beehive-buttons">
                    <BeehiveUpdateButton beehive={beehive}/>
                    <BeehiveDeleteButton beehive={beehive}/>
                </div>

                <article className="beehive">
                    <h3>{beehive.name}</h3>
                    <p>{beehive.type}</p>
                    <p>Standort: {beehive.location}</p>
                    <p className="dateTime">Update: {beehive.dateTime}</p>
                </article>

                {entries.length > 0 && (
                    <ul>
                        {entries.map((entry: Entry) => (
                            <ul key={entry.id}>
                                <li>{entry.title}</li>
                                <li>{entry.weight}</li>
                                <li>{entry.feeding}</li>
                                <li>{entry.honeyHarvest}</li>
                                <li>{entry.varroaTreatment}</li>
                                <li>{entry.queen}</li>
                                <li>{entry.egg}</li>
                                <li>{entry.brood}</li>
                                <li>{entry.queenCells}</li>
                            </ul>
                        ))}
                    </ul>
                )}
            </div>
            <div className="create-button">
                <EntryCreateButton beehive={beehive}/>
            </div>
            <footer>
                <div className="divider"></div>
                <div className="footer-container">
                    <div className="left"></div>
                    <div className="mid"></div>
                    <div className="create-button">
                        <EntryCreateButton beehive={beehive}/>
                    </div>
                </div>
            </footer>
        </div>
    )
}
