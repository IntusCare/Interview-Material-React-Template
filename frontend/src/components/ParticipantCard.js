import React from 'react';
import Card from './Card';
import { GrayscaleLabels, PrimaryIntusBlue50 } from '../colors';
import { Link } from 'react-router-dom';

const ParticipantCard = ({ idx, participant }) => {
    const cardStyle = {
        display: "flex",
        flexDirection: "row",
        color: GrayscaleLabels,
        cursor: "pointer",
    };

    const nameStyle = {
        flexBasis: "70%",
        textAlign: "left",
    };

    const icdCodeCountStyle = {
        flexBasis: "30%",
        textAlign: "left",
    };

    const onHoverStyle = {
        border: `2px solid ${PrimaryIntusBlue50}`,
    }

    const routeToParticipant = '/participant/' + idx;

    return (
        <Link to={routeToParticipant} style={{ textDecoration: "none" }} >
            <Card hoverStyle={onHoverStyle} componentStyle={{ margin: "20px 6px" }}>
                <div style={cardStyle}>
                    <div style={nameStyle}>{participant.firstName ?? ''} {participant.lastName ?? ''}</div>
                    <div style={icdCodeCountStyle}>{participant.diagnoses?.length ?? 0}</div>
                </div>
            </Card>
        </Link>
    );
};

export default ParticipantCard;