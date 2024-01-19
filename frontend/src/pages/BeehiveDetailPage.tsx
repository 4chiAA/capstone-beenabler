import {Beehive} from "../types/Beehive.ts";
import BeehiveDetail from "../components/BeehiveDetail.tsx";

type BeehiveDetailPageProps = {
    beehive: Beehive | undefined | null
    fetchBeehiveById: (id: string) => void
}

export default function BeehiveDetailPage(props: Readonly<BeehiveDetailPageProps>) {

    return (
        <div className="page-container">
            <div className="wrapper">
                <div className="title-container">
                    <div className="divider"></div>
                    <h2>Dein Bienenvolk</h2>
                    <div className="divider"></div>
                </div>
                <BeehiveDetail beehive={props.beehive} fetchBeehiveById={props.fetchBeehiveById}/>
            </div>
        </div>
    )
}
