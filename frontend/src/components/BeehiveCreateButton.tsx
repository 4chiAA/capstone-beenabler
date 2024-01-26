import {Link} from "react-router-dom";
import createBeehiveIcon from "../assets/createBeehiveIcon.svg";


export default function BeehiveCreateButton() {

    return (
        <Link to="/create">
            <img src={createBeehiveIcon} alt="Erstellen"/>
        </Link>
    )
}