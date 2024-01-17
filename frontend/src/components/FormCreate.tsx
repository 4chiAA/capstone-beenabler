import axios from "axios";
import {Beehive} from "../types/Beehive.ts";
import {ChangeEvent, FormEvent, useState} from "react";


export default function FormCreate() {

    const [inputName, setInputName] = useState<string>("")
    const [inputLocation, setInputLocation] = useState<string>("")
    const [inputType, setInputType] = useState<string>("")

    function createInputName(event: ChangeEvent<HTMLInputElement>) {
        setInputName(event.target.value)
    }

    function createInputLocation(event: ChangeEvent<HTMLInputElement>) {
        setInputLocation(event.target.value)
    }

    function createInputType(event: ChangeEvent<HTMLSelectElement>) {
        setInputType(event.target.value)
    }

    function createBeehive(newBeehive: Beehive) {
        if (!newBeehive.name || !newBeehive.location || !newBeehive.type) {
            alert("Bitte fülle alle Felder aus");
            return;
        }

        axios.post<Beehive>("/api/beehives", newBeehive)
            .then(response => {
                alert("Neues Bienenvolk \"" + response.data.name + "\" wurde erstellt");
                window.location.href = "/home";
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

    function createNewBeehive(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newBeehive: Beehive =
            {
                name: inputName,
                location: inputLocation,
                type: inputType
            }
        console.log("Werte vor dem Versenden:", newBeehive); // Füge diese Zeile hinzu

        createBeehive(newBeehive)
        setInputType("")
    }

    function cancelCreation() {
        window.location.href = "/home";
    }

    return (
        <div className="form-create-container">
            <div className="new-beehive">
                <form onSubmit={createNewBeehive}>
                    <p>Name</p>
                    <input
                        type={"text"}
                        value={inputName}
                        onChange={createInputName}/>
                    <p>Standort</p>
                    <input
                        type={"text"}
                        value={inputLocation}
                        onChange={createInputLocation}/>
                    <p>Typ</p>
                    <select value={inputType} onChange={createInputType}>
                        <option value="">Bitte wählen</option>
                        <option value="Wirtschaftsvolk">Wirtschaftsvolk</option>
                        <option value="Jungvolk">Jungvolk</option>
                    </select>
                    <div>
                        <button type="submit">Bienenvolk erstellen</button>
                        <button type="button" onClick={cancelCreation}>Abbrechen</button>
                    </div>
                </form>
            </div>
        </div>
    )
}