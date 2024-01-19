import {Link} from "react-router-dom";

export default function BeehiveCreateButton() {

    return (
        <Link to="/create">
            <button className="create-button">+</button>
        </Link>
    )
}