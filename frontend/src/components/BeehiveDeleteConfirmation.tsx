import React from "react";
import "../stylesheets/BeehiveDeleteConfirmation.css";

export type BeehiveDeleteConfirmationProps = {
    showConfirmation: boolean;
    setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
    onDelete: () => Promise<void>;
}

export default function BeehiveDeleteConfirmation(props: BeehiveDeleteConfirmationProps) {

    const handleConfirm = async () => {
        await props.onDelete();
        props.setShowConfirmation(false);
    };

    const handleCancel = () => {
        props.setShowConfirmation(false);
    };

    return props.showConfirmation ? (
        <div className="overlay">
            <div className="delete-confirmation">
                <p>Möchtest du das Bienenvolk löschen?</p>
                <button onClick={handleConfirm}>Löschen</button>
                <button onClick={handleCancel}>Abbrechen</button>
            </div>
        </div>
    ) : null;
}
