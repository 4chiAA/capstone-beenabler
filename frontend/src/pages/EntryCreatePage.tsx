import EntryCreateForm from "../components/EntryCreateForm.tsx";

export default function EntryCreatePage(){

    return (
        <div className="page-container">
            <div className="title-container">
                <div className="divider"></div>
                <h2>Eintrag erstellen</h2>
                <div className="divider"></div>
            </div>
            <EntryCreateForm/>
        </div>
    )
}