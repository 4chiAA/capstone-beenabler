import Header from "../components/Header.tsx";
import FormCreate from "../components/FormCreate.tsx";

export default function CreateBeehive(){

    return (
        <div className="page-container">
            <Header/>
            <div className="title-container">
                <h2>Bienenvolk erstellen</h2>
                <div className="divider"></div>
            </div>
            <FormCreate/>
        </div>
    )
}