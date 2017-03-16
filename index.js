// @flow

'use strict';

const alexa = require('alexa-app');
const warningsURL = require('./src/api/endpoints').warningsURL;
const alertsURL = require('./src/api/endpoints').alertsURL;
const getData = require('./src/helpers/get-data').getData;
const modelData = require('./src/helpers/model-data').modelData;

const app = new alexa.app('passport');

app.launch((request, response) => {
  response.say('Welcome to Passport, where you can get info on current travel warnings and alerts issued by the U.S. State Department. Please, ask away...');
});

app.intent('GetCountryStatus', {
  slots: { country: 'AMAZON.Country' },
  utterances: ['is it safe in {-|country}'],
}, (request, response) => {
  const phrase = request.slot('country');

  Promise.all([
    getData(warningsURL),
    getData(alertsURL),
  ])
    .then(res => modelData(res))
    .then(res => {
      if (countryStatus.country) {
        response.say(`There is currently a travel warning in effect for ${countryStatus.country}. ${countryStatus.type} This travel warning was issued on ${countryStatus.issuedAt}. ${countryStatus.advisory}. For the most accurate and up to date travel advisories, please visit the U.S. State Department's web site at www.state.gov or by calling the State Department directly at (202) 647-6575.`);
      } else {
        response.say(`I don't see a current travel warning for ${phrase}, however, for the most accurate and up to date travel advisories, please visit the U.S. State Department's web site at www.state.gov or by calling the State Department directly at (202) 647-6575.`);
      }
    })
    .catch(error => console.log(error));
}

exports.handler = app.lambda();
