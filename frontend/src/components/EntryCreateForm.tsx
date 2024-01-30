import "../stylesheets/EntryCreateForm.css";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Entry} from "../types/Entry.ts";

export default function EntryCreateForm() {

    const {beehiveId} = useParams();

    const [inputTitle, setInputTitle] = useState<string>("")
    const [inputWeight, setInputWeight] = useState<number>(0)
    const [inputFeeding, setInputFeeding] = useState<number>(0)
    const [inputHoneyHarvest, setInputHoneyHarvest] = useState<number>(0)
    const [inputVarroaTreatment, setInputVarroaTreatment] = useState<boolean>(false)
    const [inputQueen, setInputQueen] = useState<boolean>(false)
    const [inputEgg, setInputEgg] = useState<boolean>(false)
    const [inputBrood, setInputBrood] = useState<boolean>(false)
    const [inputQueenCells, setInputQueenCells] = useState<boolean>(false)
    const navigate = useNavigate();

    function createInputTitle(event: ChangeEvent<HTMLInputElement>) {
        setInputTitle(event.target.value)
    }

    function createInputWeight(event: ChangeEvent<HTMLInputElement>) {
        setInputWeight(parseInt(event.target.value))
    }

    function createInputFeeding(event: ChangeEvent<HTMLInputElement>) {
        setInputFeeding(parseInt(event.target.value))
    }

    function createInputHoneyHarvest(event: ChangeEvent<HTMLInputElement>) {
        setInputHoneyHarvest(parseInt(event.target.value))
    }

    function createInputVarroaTreatment(event: ChangeEvent<HTMLInputElement>) {
        setInputVarroaTreatment(event.target.checked)
    }

    function createInputQueen(event: ChangeEvent<HTMLInputElement>) {
        setInputQueen(event.target.checked)
    }

    function createInputEgg(event: ChangeEvent<HTMLInputElement>) {
        setInputEgg(event.target.checked)
    }

    function createInputBrood(event: ChangeEvent<HTMLInputElement>) {
        setInputBrood(event.target.checked)
    }

    function createInputQueenCells(event: ChangeEvent<HTMLInputElement>) {
        setInputQueenCells(event.target.checked)
    }

    function postEntry(beehiveId: string, newEntry: Entry) {
        if (!newEntry.title) {
            alert("Bitte einen Titel vergeben");
            return;
        }
        axios.post<Entry>("/api/entries/" + beehiveId, newEntry)
            .then(() => {
                navigate("/beehive/" + beehiveId);
            })
            .catch((error) => {
                if (error.response) {
                    alert("Fehler vom Server: " + error.response.data);
                } else if (error.request) {
                    alert("Keine Antwort vom Server erhalten");
                } else {
                    alert("Fehler beim Request: " + error.message);
                }
            });
    }

    function createNewEntry(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newEntry: Entry =
            {
                title: inputTitle,
                weight: inputWeight,
                feeding: inputFeeding,
                honeyHarvest: inputHoneyHarvest,
                varroaTreatment: inputVarroaTreatment,
                queen: inputQueen,
                egg: inputEgg,
                brood: inputBrood,
                queenCells: inputQueenCells
            }
        postEntry(String(beehiveId), newEntry)
    }

    function cancelCreation() {
        navigate("/beehive/" + beehiveId);
    }

    return (
        <div className="form-create-container">
            <form className="new-entry" onSubmit={createNewEntry}>
                <p>Titel</p>
                <input
                    type={"text"}
                    value={inputTitle}
                    onChange={createInputTitle}
                />
                <p>Gewicht</p>
                <input
                    type={"number"}
                    value={inputWeight}
                    required
                    onChange={createInputWeight}
                />
                <p>Fütterung</p>
                <input
                    type={"number"}
                    value={inputFeeding}
                    required
                    onChange={createInputFeeding}
                />
                <p>Honigentnahme</p>
                <input
                    type={"number"}
                    value={inputHoneyHarvest}
                    required
                    onChange={createInputHoneyHarvest}
                />
                <h3 className="heading">Sichtungen</h3>
                <p>
                    <input
                        type={"checkbox"}
                        checked={inputVarroaTreatment}
                        onChange={createInputVarroaTreatment}
                    />
                    Varroamilbe
                </p>
                <p>
                    <input
                        type={"checkbox"}
                        checked={inputQueen}
                        onChange={createInputQueen}
                    />
                    Königin
                </p>
                <p>
                    <input
                        type={"checkbox"}
                        checked={inputEgg}
                        onChange={createInputEgg}
                    />
                    Stifte
                </p>
                <p>
                    <input
                        type={"checkbox"}
                        checked={inputBrood}
                        onChange={createInputBrood}
                    />
                    Brut
                </p>
                <p>
                        <input
                            type={"checkbox"}
                            checked={inputQueenCells}
                            onChange={createInputQueenCells}
                        />
                    Weiselzellen
                </p>

                <div className="buttons">
                    <button type="submit">Eintrag hinzufügen</button>
                    <button type="button" onClick={cancelCreation}>Abbrechen</button>
                </div>
            </form>
        </div>
    )
}