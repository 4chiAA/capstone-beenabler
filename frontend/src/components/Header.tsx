import "../stylesheets/Header.css";
export default function Header() {

    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    <img src="src/assets/logo-beenabler.png" alt="Logo"/>
                </div>
                <div className="title">
                    <h1>BeeNabler</h1>
                </div>
                <div className="login"></div>
            </div>
            <div className="divider"></div>
        </header>
    );
}