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

    function createInputType(event: ChangeEvent<HTMLInputElement>) {
        setInputType(event.target.value)
    }

    function createBeehive(newBeehive: Beehive) {
        axios.post<Beehive>("/api/beehives", newBeehive)
            .then(response => {
                alert("Neues Bienenvolk \"" + response.data.name + "\" wurde erstellt");
            })
            .catch((error) => alert(error.message))
    }

    function createNewBeehive(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newBeehive: Beehive =
            {
                name: inputName,
                location: inputLocation,
                type: inputType
            }
        createBeehive(newBeehive)
        setInputName("")
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
                    <input
                        type={"text"}
                        value={inputType}
                        onChange={createInputType}/>
                    <div>
                        <button>Create your To-do</button>
                    </div>
                </form>
            </div>
        </div>
    )
}