import "../stylesheets/Header.css";
import {Link} from "react-router-dom";
import logoBeenabler from "../assets/logo-beenabler.png";

export default function Header() {

    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    <Link to={"/"}>
                        <img src={logoBeenabler} alt="Logo"/>
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