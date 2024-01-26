import {Link} from "react-router-dom";
import createBeehiveIcon from "../assets/createBeehiveIcon.svg";

export default function BeehiveCreateButton() {

    return (
        <Link to="/beehive/create">
            <img src={createBeehiveIcon} alt="Bienenvolk hinzufügen"/>
        </Link>
    )
}