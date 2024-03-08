const express = require("express");
const { participants } = require("./data");
// const express = require("express");

const app = express();

app.get("/participants", (_, res) => {
  res.json(participants);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // Sending the HTML file
});
// Define endpoint for fetching participant diagnoses
app.get("/diagnoses", (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;

  // Filter participants to find the one with matching first name and last name
  const participant = participants.find(
    (p) => p.firstName === firstName && p.lastName === lastName
  );

  // If participant is found, render the diagnoses page with the participant's diagnoses
  if (participant) {
    res.sendFile(__dirname + "/diagnoses.html");
  } else {
    res.status(404).send("Participant not found");
  }
});

// for (const person of participants) {
//   const row = app.createElement("tr");
//   row.innerHTML = `
//         <td>${person.name}</td>
//     `;
//   // Append the table row to the HTML table
//   table.appendChild(row);
// }
// const table = app.getElementById("peopleTable");

// // Iterate through the list of people
// for (const person in participants) {
//   // Create a new table row
//   const row = app.createElement("tr");

//   // Populate the table row with person's data
//   row.innerHTML = `
//         <td>${person.name}</td>
//     `;

//   // Append the table row to the HTML table
//   table.appendChild(row);
// }
app.listen(5002, () => {
  console.log("Server is running on port 5002");
});

module.exports = { app };
