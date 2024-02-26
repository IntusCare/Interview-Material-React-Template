import React from 'react';
import Card from './Card';
import { GrayscaleLabels } from '../colors';
import ParticipantCard from './ParticipantCard';

const ParticipantTable = ({ participants }) => {
    const headerStyle = {
        padding: '10px 20px 0px 0px',
        color: GrayscaleLabels,
        display: 'flex',
        textAlign: 'left',
    };

    return (
        <Card componentStyle={{ padding: "20px 40px" }}>
            <div style={headerStyle}>
                <div style={{ flexBasis: '70%' }}>Participant Name</div>
                <div style={{ flexBasis: '30%' }}>ICD Codes</div>
            </div>
            <hr style={{ color: GrayscaleLabels }}></hr>
            {participants.map((participant, index) => (
                <ParticipantCard idx={index} participant={participant}/>
            ))}
        </Card>
    );
};

export default ParticipantTable;