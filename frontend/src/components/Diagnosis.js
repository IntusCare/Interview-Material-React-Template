import React, { useEffect, useState } from 'react';
import { GrayscaleBlack, GrayscaleBody, GrayscaleInputBlack } from '../colors';

const Diagnosis = ({ diagnosis }) => {
    const [diagnosisDesc, setDiagnosisDesc] = useState('');

    const style = {
        padding: "20px",
        margin: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: GrayscaleInputBlack,
    };

    useEffect(() => {
        fetch('https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=' + diagnosis.icdCode)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setDiagnosisDesc(data[3][0][1])
            })
            .catch(error => console.error('Error:', error));
    }, [diagnosis.icdCode]);

    return (
        <div style={style}>
            <div style={{ color: GrayscaleBlack, marginRight: "20px" }}>{diagnosisDesc}</div>
            <div style={{ color: GrayscaleBody }}>{diagnosis.icdCode}</div>
        </div>
    );
};

export default Diagnosis;