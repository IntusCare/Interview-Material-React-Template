import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const getIcdName = async (icd) => {
    let icdName;
    try {
        //An API that isn't a search could be a better choice if available, for example for the code "I70.2" an exact match isn't found and instead it finds 40 results of more specific codes instead of the generalized parent code
        //And some codes aren't found like "J17.0" or "B21" and there are non-ICD codes like "homeFamily"
        //I have the API call only pull the first result since I didn't code a way to go through all the results and pick the best one
        let response = await fetch(`https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code&maxList=1&terms=${icd}`, { method: "GET" }); //`https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code&terms=${icd}`
        let resp = await response.json();
        if (resp && resp.length >= 4 && resp[0] !== 0) {    //If there are results
            icdName = resp[3][0][1];
        }
    } catch (e) {

    }
    return icdName;
}

const IndividualParticipantPage = ({ participants }) => {
    const navigate = useNavigate();

    let { participantid, participantname } = useParams();
    let participant = participants[participantid];

    //This is to be sure that we have the right participant. This happens because we don't have a proper ID for them, instead we're using an index. This occurs when sorting the list, copying the URL and visiting it in a new tab.
    if (participant && `${participant.lastName},${participant.firstName}` !== participantname) {
        navigate("/");  //If the participant at that index's name doesn't match the name in the URL, then it will re-direct to the participant list
    }

    const [icdLookup, setIcdLookup] = useState({}); //This could be moved to App.js so that it keeps the already loaded ICD-10 codes in memory when you go to another participant or back to the same one
    const [icdNamesLoaded, setIcdNamesLoaded] = useState(false);

    const loadIcdNames = async () => {
        let icdCodes = { ...icdLookup }; //Makes a copy of the lookup state, this is for future support where it keeps track of all the ICD-10 names
        if (participant && participant.diagnoses) {
            for (const diagnosis of participant.diagnoses) {
                if (!icdCodes[diagnosis.icdCode]) { //If it wasn't already looked up, then call the API
                    icdCodes[diagnosis.icdCode] = await getIcdName(diagnosis.icdCode);
                }
            }
        }
        setIcdLookup(icdCodes);
        setIcdNamesLoaded(true);
    };

    useEffect(() => {
        //Loads the ICD names whenever the individual partipant component loads (or if the participants state changes for some reason)
        loadIcdNames();
    }, [participants]);

    return <>
        <div className="individualPageBody">
            <Button variant="primary" className="backButton" onClick={() => { navigate("/"); }}>
                <h3>{"< Back"}</h3>
            </Button>
            {participant &&
                <Card className="individualCard">
                    <table className="individualParticipantTable">
                        <thead>
                            <tr className="tableHeaderRow">
                                <th className="individualParticpantNameHeader"><h2>{participant.lastName}, {participant.firstName}</h2></th>
                            </tr>
                        </thead>
                    </table>
                    <span className="icdHeader">ICD Codes ({participant.diagnoses.length})</span>
                    <div className="icdEntries">
                        {participant.diagnoses.map((diagnosis, i) => {
                            return <div key={i} className="icdEntry">
                                <table>
                                    <tbody>
                                        <tr>
                                            {/*<td className="icdEntryName">{icdLookup[diagnosis.icdCode] ? icdLookup[diagnosis.icdCode] : <>&nbsp;</>}</td>*/}
                                            <td className="icdEntryName">
                                                {icdNamesLoaded ?
                                                    <>{icdLookup[diagnosis.icdCode] ? icdLookup[diagnosis.icdCode] : <i>Name for code not found</i>}</>
                                                    :
                                                    <>Loading...</>
                                                }

                                            </td>
                                            <td className="icdEntryCode">{diagnosis.icdCode}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        })}
                    </div>
                </Card>}
        </div>
    </>
}

export default IndividualParticipantPage;