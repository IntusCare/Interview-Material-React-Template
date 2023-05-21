import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';


const ParticipantsPage = ({ participants, setParticipants, nameAlphabeticalSort, setNameAlphabeticalSort, largestOrder, setLargestOrder }) => {
    const navigate = useNavigate();

    //Sorts alphabetically by name
    const toggleSortParticipantsByName = () => {
        let participantsSorted = [...participants];
        if (nameAlphabeticalSort) {
            participantsSorted.sort((a, b) => { return a.lastName > b.lastName ? 1 : -1 });
        } else {
            participantsSorted.sort((a, b) => { return a.lastName < b.lastName ? 1 : -1 });
        }
        setParticipants(participantsSorted);
        setNameAlphabeticalSort(!nameAlphabeticalSort); //Toggles order
        setLargestOrder(null);  //A null value hides the ICD-10 order toggle button icon
    }

    //Sorts by the number of ICD codes, and toggles between highest to lowest and lowest to highest
    const toggleSortParticipantsByIcd = () => {
        let participantsSorted = [...participants];
        if (largestOrder) {
            participantsSorted.sort((a, b) => { return a.diagnoses.length - b.diagnoses.length });
        } else {
            participantsSorted.sort((a, b) => { return b.diagnoses.length - a.diagnoses.length });
        }
        setParticipants(participantsSorted);
        setNameAlphabeticalSort(null);  //A null value hides the participant name order toggle button icon
        setLargestOrder(!largestOrder); //Toggles order
    }

    return <>
        <h2 className="participantsHeader">Participants</h2>
        <div className="participantsPageBody">
            <Card className="participantsCard">
                <Card.Body>
                    <table className="participantsTable">
                        <thead>
                            <tr className="tableHeaderRow">
                                <th className="particpantNameHeader">
                                    <span className="sortButton" onClick={() => { toggleSortParticipantsByName(); }} >
                                        Participant Name
                                        {nameAlphabeticalSort !== null &&
                                            <> <img src={nameAlphabeticalSort ? "/orderFilter_Down.png" : "/orderFilter_Up.png"} alt="Sort by Name" /></>
                                        }
                                    </span>
                                </th>
                                <th>
                                    <span className="sortButton" onClick={() => { toggleSortParticipantsByIcd(); }} >
                                        ICD Codes
                                        {largestOrder !== null &&
                                            <> <img src={largestOrder ? "/orderFilter_Down.png" : "/orderFilter_Up.png"} alt="Sort by ICD" /></>
                                        }
                                    </span>
                                </th>
                            </tr>
                        </thead>
                    </table>
                    {participants ?
                        <div>
                            {participants.map((participant, i) => {
                                return <Card key={i} className="participantRowCard" onClick={() => { navigate(`/participant/${i}/${participant.lastName},${participant.firstName}`); }}>
                                    <table className="participantsTable">
                                        <tbody>
                                            <tr>
                                                <td className="particpantName">{participant.lastName}, {participant.firstName}</td>
                                                <td className="particpantIcdCount">{participant.diagnoses.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Card>;
                            })}
                        </div>
                        :
                        "Error loading participants."
                    }
                </Card.Body>
            </Card>
        </div>
    </>
}
export default ParticipantsPage;