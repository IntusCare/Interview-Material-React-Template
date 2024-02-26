import React, { useEffect, useState } from 'react';
import ParticipantTable from './ParticipantTable';
import { PrimaryIntusNavy } from '../colors';   

const ParticipantList = () => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/participants')
            .then(response => {
                return response.json();
            })
            .then(data => setParticipants(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h2 style={{ textAlign: "left", color: PrimaryIntusNavy }}>Participants</h2>
            <div style={{ marginLeft: "30px" }}>
                <ParticipantTable participants={participants} />
            </div>
        </div>
    );
};

export default ParticipantList;