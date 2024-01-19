import "../stylesheets/Header.css";
import {Link} from "react-router-dom";
export default function Header() {

    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    <Link to={"/home"}>
                        <img src="src/assets/logo-beenabler.png" alt="Logo"/>
                    </Link>
                </div>
                <div className="title">
                    <h1>BeeNabler</h1>
                </div>
                <div className="login"></div>
            </div>
        </header>
    );
}