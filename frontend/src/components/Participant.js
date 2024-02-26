import React, { useEffect, useState } from 'react';
import Card from './Card';
import Diagnosis from './Diagnosis';
import { GrayscaleLabels } from '../colors';
import { useParams, useNavigate } from 'react-router-dom';

const Participant = () => {
    const [participant, setParticipant] = useState([]);
    const { participantIdx } = useParams();
    const navigate = useNavigate();

    const cardStyle = {
        textAlign: 'left',
    };

    useEffect(() => {
        fetch('http://localhost:5001/participants')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setParticipant(data[participantIdx])
            })
            .catch(error => console.error('Error:', error));
    }, [participantIdx]);

    return (
        <div style={{ display: 'flex', flexDirection: "row" }}>
            <div style={{ margin: "40px" }}>
                <button class="button" onClick={() => navigate(-1)}><h3>&lt; Back</h3></button>
            </div>
            <div style={{ margin: "40px" }}>
                <Card componentStyle={{ maxWidth: '800px' }}>
                    <div style={cardStyle}>
                        <h2>{participant.firstName ?? ''} {participant.lastName ?? ''}</h2>
                        <hr style={{ margin: "10px" }} />
                        <div style={{ color: GrayscaleLabels, padding: "6px" }}>ICD Codes ({participant.diagnoses?.length ?? 0})</div>
                        <div style={{ padding: "6px" }}>
                            {participant.diagnoses?.map((diagnosis, _) => (
                                <Diagnosis diagnosis={diagnosis} />
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Participant;