import Header from "../components/Header.tsx";
import BeehiveCreateForm from "../components/BeehiveCreateForm.tsx";

export default function BeehiveCreatePage(){

    return (
        <div className="page-container">
            <Header/>
            <div className="title-container">
                <h2>Bienenvolk erstellen</h2>
                <div className="divider"></div>
            </div>
            <BeehiveCreateForm/>
        </div>
    )
}