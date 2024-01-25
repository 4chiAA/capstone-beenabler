import {useState} from "react";
import axios from "axios";
import BeehiveDeleteConfirmation from "./BeehiveDeleteConfirmation.tsx";
import {Beehive} from "../types/Beehive.ts";
import deleteBeehiveButton from "../assets/deleteBeehiveButton.svg";

export type BeehiveDeleteButtonProps = {
    beehive: Beehive | undefined | null
}

export default function BeehiveDeleteButton(props: Readonly<BeehiveDeleteButtonProps>) {

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete("/api/beehives/" + props.beehive?.id);
            setShowConfirmation(false);
            window.location.href = "/";
        } catch (error) {
            alert("Fehler beim löschen");
            setShowConfirmation(false);
        }
    };

    function handleConfirmation () {
        setShowConfirmation(true);
    }

    return (
        <div>
            <input
                type="image"
                src={deleteBeehiveButton}
                alt="Löschen"
                onClick={handleConfirmation}
                />

            <BeehiveDeleteConfirmation
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
                onDelete={handleDelete}
            />
        </div>
    );
}
