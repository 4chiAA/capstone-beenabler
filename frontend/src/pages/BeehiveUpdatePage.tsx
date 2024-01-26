import BeehiveUpdateForm from "../components/BeehiveUpdateForm.tsx";

export default function BeehiveUpdatePage(){

    return (
        <div className="page-container">
            <div className="title-container">
                <div className="divider"></div>
                <h2>Bienenvolk anpassen</h2>
                <div className="divider"></div>
            </div>
            <BeehiveUpdateForm/>
        </div>
    )
}