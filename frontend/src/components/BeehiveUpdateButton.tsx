import {Link} from "react-router-dom";
import {Beehive} from "../types/Beehive.ts";
import updateBeehiveIcon from "../assets/updateBeehiveIcon.svg";

type BeehiveUpdateButtonProps = {
    beehive: Beehive | undefined | null
}

export default function BeehiveUpdateButton(props: Readonly<BeehiveUpdateButtonProps>) {

    return (
        <div>
            <Link to={"/beehive/update/" + props.beehive?.id}>
                <img src={updateBeehiveIcon} alt="Erstellen"/>
            </Link>
        </div>
    )
}
