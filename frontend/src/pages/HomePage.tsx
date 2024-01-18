import "../stylesheets/HomePage.css";
import {Beehive} from "../types/Beehive.ts";
import BeehivesPreview from "../components/BeehivesPreview.tsx";
import Header from "../components/Header.tsx";
import {Link} from "react-router-dom";
import FooterHome from "../components/FooterHome.tsx";

type HomeProps = {
    beehivesPreview: Beehive[]
}

export default function HomePage(props: Readonly<HomeProps>){

    return (
        <div className="page-container">
            <Header/>
            <div className="wrapper">
            <div className="title-container">
                <h2>Deine Bienenvölker</h2>
                <div className="divider"></div>
            </div>
            <BeehivesPreview beehives={props.beehivesPreview}/>
            <Link className="create-button-home" to="/create">
                <button className="create-button">+</button>
            </Link>
            </div>
            <FooterHome/>
        </div>
    )
}