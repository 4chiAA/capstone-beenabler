import "../stylesheets/HomePage.css";
import {Beehive} from "../types/Beehive.ts";
import BeehivesPreview from "../components/BeehivesPreview.tsx";
import FooterHome from "../components/FooterHome.tsx";
import BeehiveCreateButton from "../components/BeehiveCreateButton.tsx";

type HomeProps = {
    beehivesPreview: Beehive[]
}

export default function HomePage(props: Readonly<HomeProps>){

    return (
        <div className="page-container">
            <div className="wrapper">
                <div className="title-container">
                    <div className="divider"></div>
                    <h2>Deine Bienenvölker</h2>
                    <div className="divider"></div>
                </div>
                <BeehivesPreview beehives={props.beehivesPreview}/>
                <div className="create-button-home">
                    <BeehiveCreateButton/>
                </div>
            </div>
            <FooterHome/>
        </div>
    )
}