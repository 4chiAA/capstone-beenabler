import {Link} from "react-router-dom";
import {Beehive} from "../types/Beehive.ts";
import updateBeehiveButton from "../assets/updateBeehiveButton.svg";

type BeehiveUpdateButtonProps = {
    beehive: Beehive | undefined | null
}

export default function BeehiveUpdateButton(props: Readonly<BeehiveUpdateButtonProps>) {

    return (
        <div>
            <Link to={"/beehive/update/" + props.beehive?.id}>
                <img src={updateBeehiveButton} alt="Erstellen"/>
            </Link>
        </div>
    )
}
