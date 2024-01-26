import {Link} from "react-router-dom";
import createEntryIcon from "../assets/createEntryIcon.svg";
import {Beehive} from "../types/Beehive.ts";

type EntryCreateButtonProps = {
    beehive: Beehive | undefined | null
}

export default function EntryCreateButton(props: Readonly<EntryCreateButtonProps>) {

    return (
        <Link to={"/entry/create/" + props.beehive?.id}>
            <img src={createEntryIcon} alt="Eintrag erstellen"/>
        </Link>
    )
}