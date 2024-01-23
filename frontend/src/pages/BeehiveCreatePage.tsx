import BeehiveCreateForm from "../components/BeehiveCreateForm.tsx";

export default function BeehiveCreatePage(){

    return (
        <div className="page-container">
            <div className="title-container">
                <div className="divider"></div>
                <h2>Bienenvolk erstellen</h2>
                <div className="divider"></div>
            </div>
            <BeehiveCreateForm/>
        </div>
    )
}