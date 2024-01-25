import {Link} from "react-router-dom";
import createBeehiveButton from "../assets/createBeehiveButton.svg";


export default function BeehiveCreateButton() {

    return (
        <Link to="/create">
            <img src={createBeehiveButton} alt="Erstellen"/>
        </Link>
    )
}