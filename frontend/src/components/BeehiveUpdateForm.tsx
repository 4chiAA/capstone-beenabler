import "../stylesheets/BeehiveCreateForm.css";
import axios, {AxiosError} from "axios";
import {Beehive} from "../types/Beehive.ts";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

type BeehiveUpdateProps = {
    beehive: Beehive | undefined | null
    getBeehiveById: (id: string) => void
}

export default function BeehiveUpdateForm(props: Readonly<BeehiveUpdateProps>) {

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [inputName, setInputName] = useState<string>(String(""))
    const [inputLocation, setInputLocation] = useState<string>(String(""))
    const [inputType, setInputType] = useState<string>(String(""))

    useEffect(() => {
        if (!props.beehive || (props.beehive && props.beehive.id !== id)) {
            // Nur laden, wenn das beehive nicht vorhanden ist oder die ID unterschiedlich ist
            props.getBeehiveById(String(id));
            setLoading(true);
        }
    }, [id, props]);

    useEffect(() => {
        if (props.beehive) {
            setInputName(props.beehive.name || "");
            setInputLocation(props.beehive.location || "");
            setInputType(props.beehive.type || "");
        }
        setLoading(false);
    }, [props.beehive]);

    function updateInputName(event: ChangeEvent<HTMLInputElement>) {
        setInputName(event.target.value)
    }

    function updateInputLocation(event: ChangeEvent<HTMLInputElement>) {
        setInputLocation(event.target.value)
    }

    function updateInputType(event: ChangeEvent<HTMLSelectElement>) {
        setInputType(event.target.value)
    }

    function putBeehive(id: string, updatedBeehive: Beehive) {
        axios.put<Beehive>("/api/beehives/" + id, updatedBeehive)
            .then(response => {
                console.log("Bienenvolk " + response.data.name + " wurde angepasst");
                window.location.href = "/";
            })
            .catch(handleUpdateError);
    }

    function handleUpdateError(error: AxiosError) {
        if (error.response) {
            alert("Fehler vom Server: " + error.response.data);
        } else if (error.request) {
            alert("Keine Antwort vom Server erhalten");
        } else {
            alert("Fehler beim Request: " + error.message);
        }
    }

    function updateBeehive(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const updatedBeehive: Beehive =
            {
                id: props.beehive?.id,
                dateTime: props.beehive?.dateTime,
                name: inputName,
                location: inputLocation,
                type: inputType
            }
        putBeehive(String(props.beehive?.id), updatedBeehive);
    }

    function cancelCreation() {
        window.location.href = "/";
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="form-create-container">
            <form className="new-beehive" onSubmit={updateBeehive}>
                <p>Name</p>
                <input
                    type={"text"}
                    value={inputName}
                    onChange={updateInputName}/>
                <p>Standort</p>
                <input
                    type={"text"}
                    value={inputLocation}
                    onChange={updateInputLocation}/>
                <p>Typ</p>
                <select value={inputType} onChange={updateInputType}>
                    <option value="">Bitte wählen</option>
                    <option value="Wirtschaftsvolk">Wirtschaftsvolk</option>
                    <option value="Jungvolk">Jungvolk</option>
                </select>
                <div className="new-beehive buttons">
                    <button type="button" onClick={cancelCreation}>Abbrechen</button>
                    <button type="submit">Bienenvolk anpassen</button>
                </div>
            </form>
        </div>
    )
}