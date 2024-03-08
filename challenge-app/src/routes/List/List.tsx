import { Link, useLoaderData } from "react-router-dom";
import { participant } from "../../types/participant";
import "./styles.scss"
import { useState } from "react";

export default function List({ }){
    const { participants } = useLoaderData() as { participants: participant[] }
    const [sortNumCodesAscending, setSortNumCodesAscending] = useState(false)

    // sort participants by number of diagnoses
    let sortedParticipants = participants.map((data, i) => ({...data, id: i}))
    sortedParticipants = sortedParticipants.sort((a, b) => sortNumCodesAscending ? (a.diagnoses.length - b.diagnoses.length) : (b.diagnoses.length - a.diagnoses.length))

    return (
        <div>
            <h2 className="list-heading">Participants</h2>
            <div className="intus-card participants-list-card p-4">
                <div className="row list-header mb-4 pb-2">
                    <div className="col-8">
                        <p className="label body">Participant Name</p>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <p className="label body">ICD Codes</p>
                        <img className="sort-button" onClick={() => setSortNumCodesAscending(!sortNumCodesAscending)} src={sortNumCodesAscending ? '/orderFilter_Up.png' : '/orderFilter_Down.png'} />
                    </div>
                </div>
                <div className="p-2">
                    { sortedParticipants.map((data, i) => <Link key={i} to={`/participants/${data.id}`}><ParticipantCard {...data} /></Link>)}
                </div>
            </div>
        </div>
    )
}

function ParticipantCard({ firstName, lastName, diagnoses }){
    return (
        <div className="intus-card hover-enabled p-3 d-flex justify-content-between mb-4 align-align-items-center ">
            <p className="body">{ firstName } { lastName }</p>
            <p className="body">{ diagnoses.length }</p>
        </div>
    )
}