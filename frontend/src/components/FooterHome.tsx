import "../stylesheets/FooterHome.css";
import BeehiveCreateButton from "./BeehiveCreateButton.tsx";
export default function FooterHome() {

    return (
        <footer>
            <div className="divider"></div>
            <div className="footer-container">
                <div className="left"></div>
                <div className="mid"></div>
                <BeehiveCreateButton/>
            </div>
        </footer>
    );
}