const faker = require("faker");
const { ICD_CODE } = require("./constants/icdCode");

function makeDiagnosis(numDiagnoses) {
  const result = [];

  for (let i = 0; i < numDiagnoses; i++) {
    result.push({
      icdCode: faker.random.arrayElement(ICD_CODE),
      timestamp: faker.date.recent(365),
    });
  }

  return result.sort((a, b) => new Date(a.timestamp - b.timestamp));
}

function makeParticipants(numParticipants) {
  const result = [];

  for (let i = 0; i < numParticipants; i++) {
    result.push({
      id: i,  //I changed this so every participant has an unique id based off of the index number generating it, I don't currently do anything with it.
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      dateOfBirth: faker.date.past(10, new Date(1950, 0, 1)),
      gender: faker.random.arrayElement(["MALE", "FEMALE", "NON-BINARY"]),
      phoneNumber: faker.datatype.number({ min: 1000000000, max: 9999999999 }),
      patientNotes: faker.random.arrayElement([faker.lorem.text(), null]),
      diagnoses: makeDiagnosis(faker.datatype.number({ min: 0, max: 20 })),     //I changed this so that not every participant has 10 diagnoses, it'll be a random number from 0 to 20.
    });
  }

  return result;
}

const participants = makeParticipants(200);

module.exports = { participants };
