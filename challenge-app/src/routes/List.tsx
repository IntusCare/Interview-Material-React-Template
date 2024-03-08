import { Link, useLoaderData } from "react-router-dom";
import { participant } from "../types/participant";


export default function List({ }){
    const { participants } = useLoaderData() as { participants: participant[] }

    console.log(participants)

    return (
        <div>
            <h2>List</h2>
            <Link to={`participants/1`}>Participant 1</Link>
        </div>
    )
}