import {Beehive} from "../types/Beehive.ts";
import BeehivePreview from "../components/BeehivePreview.tsx";

type HomeProps = {
    beehivesPreview: Beehive[]
}

export default function Home(props: Readonly<HomeProps>){

    return (
        <BeehivePreview beehives={props.beehivesPreview}/>
    )
}