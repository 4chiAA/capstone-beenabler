import "../stylesheets/Footer.css";
import EntryCreateButton from "./EntryCreateButton.tsx";

export default function FooterBeehiveDetail() {

    return (
        <footer>
            <div className="divider"></div>
            <div className="footer-container">
                <div className="left"></div>
                <div className="mid"></div>
                <div className="create-button">
                    <EntryCreateButton/>
                </div>
            </div>
        </footer>
    );
}