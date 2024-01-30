import "../stylesheets/BeehiveCreateForm.css";
import axios, {AxiosError} from "axios";
import {Beehive} from "../types/Beehive.ts";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import getBeehiveById from "../service/apiService.ts";

export default function BeehiveUpdateForm() {

    const {beehiveId} = useParams();
    const [beehive, setBeehive] = useState<Beehive | undefined | null>(undefined)
    const [inputName, setInputName] = useState<string>(String(""))
    const [inputLocation, setInputLocation] = useState<string>(String(""))
    const [inputType, setInputType] = useState<string>(String(""))
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!beehive || (beehive &&  beehive.id !== beehiveId)) {
            getBeehiveById(String(beehiveId), setBeehive);
            setLoading(true);
        }
    }, [beehive, beehiveId]);

    useEffect(() => {
        if (beehive) {
            setInputName(beehive.name || "");
            setInputLocation(beehive.location || "");
            setInputType(beehive.type || "");
        }
        setLoading(false);
    }, [beehive]);

    function putBeehive(beehiveId: string, updatedBeehive: Beehive) {
        axios.put<Beehive>("/api/beehives/" + beehiveId, updatedBeehive)
            .then(() => {
                navigate("/beehive/" + beehiveId);
            })
            .catch(handleUpdateError);
    }

    function updateInputName(event: ChangeEvent<HTMLInputElement>) {
        setInputName(event.target.value)
    }

    function updateInputLocation(event: ChangeEvent<HTMLInputElement>) {
        setInputLocation(event.target.value)
    }

    function updateInputType(event: ChangeEvent<HTMLSelectElement>) {
        setInputType(event.target.value)
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
                id: beehiveId,
                dateTime: beehive?.dateTime,
                name: inputName,
                location: inputLocation,
                type: inputType
            }
        putBeehive(String(beehiveId), updatedBeehive);
    }

    function cancelUpdate() {
        navigate("/beehive/" + beehiveId);
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
                    <button type="submit">Bienenvolk anpassen</button>
                    <button type="button" onClick={cancelUpdate}>Abbrechen</button>
                </div>
            </form>
        </div>
    )
}