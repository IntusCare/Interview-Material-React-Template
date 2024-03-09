# Coding Challenge

## Basic Participant List Feature

##### Scenario

Your client wants to be able to keep track of the participant (ppt) information for their organization. The first feature is a list of participants with the corresponding ICD codes for each ppt. The client would like to see a list of all their participants and sort them based on how many codes each ppt has. They also need to see each partipant's codes (in both code and plain english) in a focus view for each person. We recommend using react-router-dom, bootstrap, and scss since that is what IntusCare uses.

Areas to focus on:

- [ ] extensibility of the list component
- [ ] routing and saving history of navigation between list and focus view, with the possibility of added pages to the app in the future

Base Feature

- [ ] Participant list view w/ ICD code count
- [ ] Participant focus view w/ ICD code and condition name list

Extra Features

- [ ] Sorting filter for Ppt list view: default to sorting highest to lowest, can be toggled to sort from lowest to highest;
- [ ] Bonus points: make the sorting filter extensible to sort by Partipant name (alphabetical)

Please see the figma link for a hi-fi prototype of ideal behavior and styling for the app. You can also press play in the upper right corner to click through the prototype's behavior.
We have provided the styling specifications (hexcode, drop shadow, border radius, etc.) for you in hopes of making the styling portion easier, as we are trying to test functionality, reusability, and responsiveness more than styling perfection. You will also find icons and logo assets to use in this repo (format choice is up to you).

Figma: https://www.figma.com/file/5xvyEkogl7FVbl5hbiJptO/PptListFeature?node-id=0%3A1

##### Notes

You are provided with a simple Express API which provides a `GET /participants` route for fetching ppt information (including participant names and their ICD Codes). Use the Clinial Table Search Service provided by the National Library of Medicine (linked [here](https://clinicaltables.nlm.nih.gov/apidoc/icd10cm/v3/doc.html)) to retrieve the plain english names for the associated ICD codes.

Please init your own React frontend project here in this repo. Also make sure to create your own feature branch and submit a PR when you are done with the challenge.

Good luck!

##### Run Instructions

To start the API Server, run `node ./api/index.js` from the repository's root directory
