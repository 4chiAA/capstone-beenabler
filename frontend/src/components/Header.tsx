import "../stylesheets/Header.css";
export default function Header() {

    return (
        <header>
            <div id="header-container">
                <div id="logo-container">
                    <img src="src/assets/logo-beenabler.png" alt="Logo"/>
                </div>
                <div id="title-container">
                    <h1>BeeNabler</h1>
                </div>
            </div>
            <div id="divider"></div>
        </header>
    );
}