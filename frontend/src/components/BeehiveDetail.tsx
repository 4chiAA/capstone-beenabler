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
                    <h1 className="heading">{beehive.name}</h1>
                    <p>{beehive.type}</p>
                    <p>Standort: {beehive.location}</p>
                    <p className="dateTime">Update: {beehive.dateTime} Uhr</p>
                </article>

                {entries.length > 0 && (
                    <div className="entry-container">
                        <h2>Einträge</h2>
                        {entries.map((entry: Entry) => (
                            <article className="entry" key={entry.id}>
                                <h3 className="entry-title">{entry.title}</h3>
                                <section className="entry-actions">
                                    {entry.weight > 0 ? <p className="entry-number">Gewicht {entry.weight} kg</p> : <p className="entry-number">Gewicht -</p>}
                                    {entry.feeding > 0 ? <p className="entry-number">Fütterung {entry.feeding} kg</p> : <p className="entry-number">Fütterung -</p>}
                                    {entry.honeyHarvest > 0 ? <p className="entry-number">Honigentnahme {entry.honeyHarvest} kg</p> : <p className="entry-number">Honigentnahme -</p>}
                                </section>
                                <h3>Sichtungen</h3>
                                <section className="entry-sightings">
                                    <p>Varroabehandlung <input type="checkbox" checked={entry.varroaTreatment} disabled /></p>
                                    <p>Königin <input type="checkbox" checked={entry.queen} disabled /></p>
                                    <p>Stifte <input type="checkbox" checked={entry.egg} disabled /></p>
                                    <p>Brut <input type="checkbox" checked={entry.brood} disabled /></p>
                                    <p>Weiselzellen <input type="checkbox" checked={entry.queenCells} disabled /></p>
                                </section>
                            </article>
                        ))}
                    </div>
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
