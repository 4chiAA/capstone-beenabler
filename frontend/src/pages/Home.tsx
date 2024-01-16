import {Beehive} from "../types/Beehive.ts";
import PreviewBeehives from "../components/PreviewBeehives.tsx";
import Header from "../components/Header.tsx";

type HomeProps = {
    beehivesPreview: Beehive[]
}

export default function Home(props: Readonly<HomeProps>){

    return (
        <div className="page-container">
            <Header/>
            <div className="title-container">
                <h2>Deine Bienenvölker</h2>
                <div className="divider"></div>
            </div>
            <PreviewBeehives beehives={props.beehivesPreview}/>
            <button>Add</button>
        </div>
    )
}