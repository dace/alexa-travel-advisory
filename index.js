// @flow

'use strict';

const alexa = require('alexa-app');
const warningsURL = require('./src/api/endpoints').warningsURL;
const alertsURL = require('./src/api/endpoints').alertsURL;
const getData = require('./src/helpers/get-data').getData;
const modelData = require('./src/helpers/model-data').modelData;

const app = new alexa.app('passport');

//  Launch welcome

app.launch((request, response) => {
  response.say('Welcome to Passport, where you can get info on current travel warnings and alerts issued by the U.S. State Department. Please, ask away...');
});


//  Get definition for travel warning

app.intent('GetWarningDefinition', {
  utterances: [
    'what is a travel warning',
  ],
}, (request, response) => {
  Promise.all([getData(warningsURL)])
    .then(res => modelData(res))
    .then((res) => {
      response.say(`${res.warnings.description}`);
    })
    .catch((error) => {
      response.say(`I'm sorry, but I'm having a little trouble with your request. It seems that there is the following error: ${error}.`);
    });
});

//  Definition for a travel alert

app.intent('GetAlertDefinition', {
  utterances: [
    'what is a travel alert',
  ],
}, (request, response) => {
  Promise.all([getData(alertsURL)])
    .then(res => modelData(res))
    .then((res) => {
      response.say(`${res.alerts.description}`);
    })
    .catch((error) => {
      response.say(`I'm sorry, but I'm having a little trouble with your request. It seems that there is the following error: ${error}.`);
    });
});

// Difference between a travel warning and travel alert (definitions)

app.intent('GetAlertAndWarningDefinition', {
  utterances: [
    'what\'s the difference between a warning and an alert',
  ],
}, (request, response) => {
  Promise.all([
    getData(warningsURL),
    getData(alertsURL),
  ])
    .then((res) => modelData(res))
    .then((res) => {
      response.say(`${res.warnings.description}. meanwhile, ${res.alerts.description}.`);
    })
    .catch((error) => {
      response.say(`I'm sorry, but I'm having a little trouble with your request. It seems that there is the following error: ${error}.`);
    });
});

// Find country status

app.intent('GetCountryStatus', {
  slots: { country: 'AMAZON.Country' },
  utterances: [
    'is it safe in {-|country}',
    'should I visit {-|country}',
    'is it ok to visit {-|country}',
    'is it dangerous in {-|country}',
    'what\'s going on in {-|country}',
    'is there any reason to now visit {-|country}',
    'does {-|country} have any warnings or alerts',
  ],
}, (request, response) => {
  const phrase = request.slot('country').toLowerCase();

  Promise.all([
    getData(warningsURL),
    getData(alertsURL),
  ])
    .then(res => modelData(res))
    .then((res) => {
      let searchResult = null;

      res.warnings.list.forEach((item) => {
        if (item.country.includes(phrase)) {
          searchResult = {
            type: 'warning',
            details: item,
          };
        }
      });

      res.alerts.list.forEach((item) => {
        if (item.country.includes(phrase)) {
          searchResult = {
            type: 'warning',
            details: item,
          };
        }
      });

      if (searchResult) {
        response.say(`There is currently a travel ${searchResult.type} in effect for ${searchResult.details.country}. This travel ${searchResult.type} was issued on ${searchResult.details.issuedAt}. ${searchResult.details.description}. For the most accurate and up to date travel advisories, please visit the U.S. State Department's web site at www.state.gov or by calling the State Department directly at (202) 647-6575.`);
      } else {
        response.say(`I don't see any current travel warnings or alerts for ${phrase}, however, for the most accurate and up to date travel advisories, please visit the U.S. State Department's web site at www.state.gov or by calling the State Department directly at (202) 647-6575.`);
      }
    })
    .catch((error) => {
      response.say(`I'm sorry, but I'm having a little trouble with your request. It seems that there is the following error: ${error}.`);
    });
});

//  Find number of total warnings

app.intent('GetCount', {
  utterances: [
    'how many',
    'how many current',
    'how many alerts are there',
    'how many alerts are issued',
    'how many warnings are there',
    'how many warnings are issued',
    'what is the number of',
  ],
}, (request, response) => {
  Promise.all([
    getData(warningsURL),
    getData(alertsURL),
  ])
    .then(res => modelData(res))
    .then((res) => {
      response.say(`The U.S. State Department currently has ${res.warnings.list.length} issued warnings and ${res.alerts.list.length} issued alerts.`);
    })
    .catch((error) => {
      response.say(`I'm sorry, but I'm having a little trouble with your request. It seems that there is the following error: ${error}.`);
    });
});

exports.handler = app.lambda();
