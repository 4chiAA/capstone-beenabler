import axios from "axios";
import {Beehive} from "../types/Beehive.ts";

export default function getBeehiveById(id: string, setter: (data: Beehive) => void) {
    axios.get("/api/beehives/" + id)
        .then(response => setter(response.data))
        .catch((error: Error) => console.error(error));
}
