import {Beehive} from "../types/Beehive.ts";

type BeehivePreviewProps = {
    beehives: Beehive[]
}

export default function BeehivePreview(props: Readonly<BeehivePreviewProps>){

    if (props.beehives.length === 0) {
        return ("You don't have any beehives")
    }

    return (
        <section>
                {props.beehives.map((beehive: Beehive) => (
                    <article key={beehive.id}>
                        <p>{beehive.name}</p>
                        <p>{beehive.dateTime}</p>
                        <p>{beehive.type}</p>
                    </article>
                ))}
        </section>

    )

}