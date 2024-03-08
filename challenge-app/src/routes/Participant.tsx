import { useLoaderData, useParams } from "react-router-dom"


export default function Participant({ }){
    const { participantId } = useParams()
    const { diagnoses } = useLoaderData() as { diagnoses: { code: string, description: string }[] }

    console.log(diagnoses)

    return (
        <div>
            <h2>Participant { participantId }</h2>
        </div>
    )
}