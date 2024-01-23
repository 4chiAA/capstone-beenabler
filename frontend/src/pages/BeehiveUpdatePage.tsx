import BeehiveUpdateForm from "../components/BeehiveUpdateForm.tsx";
import {Beehive} from "../types/Beehive.ts";

type BeehiveUpdatePageProps = {
    beehive: Beehive | undefined | null
    getBeehiveById: (id: string) => void
}

export default function BeehiveUpdatePage(props: Readonly<BeehiveUpdatePageProps>){

    return (
        <div className="page-container">
            <div className="title-container">
                <div className="divider"></div>
                <h2>Bienenvolk anpassen</h2>
                <div className="divider"></div>
            </div>
            <BeehiveUpdateForm beehive={props.beehive} getBeehiveById={props.getBeehiveById}/>
        </div>
    )
}