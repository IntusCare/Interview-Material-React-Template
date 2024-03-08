import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import List from './routes/List/List';
import Participant from './routes/Participant/Participant';
import Root from './routes/Root/Root';

const PARTICIPANTS_ENDPOINT = "http://localhost:5000/participants"
const ICD_ENDPOINT = (code: string) => `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${code}`

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <List />,
                loader: async ({ request }) => {
                    const res = await fetch(PARTICIPANTS_ENDPOINT)
                    const participants = await res.json()
                    return { participants }
                },
            },
            {
                path: "participants/:participantId",
                element: <Participant />,
                loader: async ({ request, params }) => {
                    const res = await fetch(PARTICIPANTS_ENDPOINT)
                    const participants = await res.json()
                    const participantId = parseInt(params.participantId as string)
                    
                    const { diagnoses: codes, firstName, lastName } = participants[participantId]

                    const diagnoses = []
                    for(const { icdCode } of codes){
                        const matches = (await (await fetch(ICD_ENDPOINT(icdCode))).json())[3]
                        const description = matches.length == 1 ? matches[0][1] : "UNKNOWN"
                        diagnoses.push({ code: icdCode, description })
                    }

                    return { diagnoses, firstName, lastName }
                },
            },
        ]
    },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
