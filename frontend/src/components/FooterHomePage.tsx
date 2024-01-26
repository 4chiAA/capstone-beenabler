import "../stylesheets/Footer.css";
import BeehiveCreateButton from "./BeehiveCreateButton.tsx";

export default function FooterHomePage() {

    return (
        <footer>
            <div className="divider"></div>
            <div className="footer-container">
                <div className="left"></div>
                <div className="mid"></div>
                <div className="create-button">
                    <BeehiveCreateButton/>
                </div>
            </div>
        </footer>
    );
}