// @flow

'use strict';

const alexa = require('alexa-app');
const endpoints = require('./src/api/endpoints');
const getData = require('./src/api/get-data');
const modelData = require('./src/model-data');

const app = new alexa.app('passport');

app.launch((request, response) => {
  response.say('Welcome to Passport, where you can get info on current travel warnings and alerts issued by the U.S. State Department. Please, ask away...');
});

const getWarnings = getData(endpoints.warningsUrl);
const getAlerts = getData(endpoints.alertsUrl);

Promise.all([getWarnings(), getAlerts()])
  .then(res => modelData(res))
  .then(res => console.log(res))
  .catch(error => console.log(error));


//
// app.intent('GetCountryStatus', {
//   slots: {
//     country: 'AMAZON.Country',
//   },
//   utterances: [
//     'is it safe in {-|country}',
//   ],
// }, (request, response) => {
//   const phrase = request.slot('country');
//
//   return fetch(warningsURL)
//     .then(res => res.text())
//     .then(data => parseString(data, (err, result) => {
//       if (err) {
//         throw err;
//       }
//
//
//
//       if (countryStatus.country) {
//         response.say(`There is currently a travel warning in effect for ${countryStatus.country}. ${countryStatus.type} This travel warning was issued at ${countryStatus.issuedAt}. ${countryStatus.advisory}. For the most accurate and up to date travel advisories, please visit the U.S. State Department's web site at www.state.gov or by calling the State Department directly at (202) 647-6575.`);
//       } else {
//         response.say(`I don't see a current travel warning for ${phrase}, however, for the most accurate and up to date travel advisories, please visit the U.S. State Department's web site at www.state.gov or by calling the State Department directly at (202) 647-6575.`);
//       }
//     }))
//     .catch((err) => {
//       response.say('Sorry, but there was the following error:', err);
//     });
// });
//
// exports.handler = app.lambda();
