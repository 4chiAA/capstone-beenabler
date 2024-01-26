import "../stylesheets/BeehiveCreateForm.css";
import axios from "axios";
import {Beehive} from "../types/Beehive.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";


export default function BeehiveCreateForm() {

    const [inputName, setInputName] = useState<string>("")
    const [inputLocation, setInputLocation] = useState<string>("")
    const [inputType, setInputType] = useState<string>("")
    const navigate = useNavigate();

    function createInputName(event: ChangeEvent<HTMLInputElement>) {
        setInputName(event.target.value)
    }

    function createInputLocation(event: ChangeEvent<HTMLInputElement>) {
        setInputLocation(event.target.value)
    }

    function createInputType(event: ChangeEvent<HTMLSelectElement>) {
        setInputType(event.target.value)
    }

    function postBeehive(newBeehive: Beehive) {
        if (!newBeehive.name || !newBeehive.location || !newBeehive.type) {
            alert("Bitte fülle alle Felder aus");
            return;
        }

        axios.post<Beehive>("/api/beehives", newBeehive)
            .then(() => {
                navigate("/");
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
          postBeehive(newBeehive)
    }

    function cancelCreation() {
        navigate("/");
    }

    return (
        <div className="form-create-container">
            <form className="new-beehive" onSubmit={createNewBeehive}>
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
                    <div className="new-beehive buttons">
                        <button type="button" onClick={cancelCreation}>Abbrechen</button>
                        <button type="submit">Bienenvolk erstellen</button>
                    </div>
            </form>
        </div>
    )
}