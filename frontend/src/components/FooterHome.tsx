import "../stylesheets/FooterHome.css";
import {Link} from "react-router-dom";
export default function FooterHome() {

    return (
        <footer>
            <div className="divider"></div>
            <div className="footer-container">
                <div className="left"></div>
                <div className="mid"></div>
                <Link to="/create">
                    <button className="create-button">+</button>
                </Link>
            </div>
        </footer>
    );
}