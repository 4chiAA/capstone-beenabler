import {Link} from "react-router-dom";

export default function BeehiveCreateButton() {

    return (
        <Link to="/create">
            <img src="src/assets/createBeehiveButton.svg" alt="Erstellen"/>
        </Link>
    )
}