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
