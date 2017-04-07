'use strict';

const alexa = require('alexa-app');
const endpoint = require('./src/api/endpoints');
const getData = require('./src/helpers/get-data').getData;
const modelData = require('./src/helpers/model-data').modelData;

const app = new alexa.app('passport');

//  Launch welcome

app.launch((request, response) => {
  response.say('Welcome to Passport, an unofficial skill, where you can hear the latest travel warnings and alerts as issued by the U.S. State Department. You can request specific country information by asking things like: "Is it safe in Syria?" or "What is the status of Sudan?". You can even get information explaining the different types of advisories by asking, "What is the difference between a warning and an alert?". Go ahead, ask away.');
});

// //  Get definition for travel warning

app.intent('GetWarningDefinition', {
  utterances: ['what is a travel warning']
}, (request, response) => {
  return Promise.all([getData(endpoint.warningsURL)]).then(res => modelData(res)).then(res => {
    response.say(`${res.warnings.description}`);
  }).catch(error => {
    response.say(`I'm sorry, but I'm having a little trouble with your request. It seems that there is the following error: ${error}.`);
  });
});

//  Definition for a travel alert

app.intent('GetAlertDefinition', {
  utterances: ['what is a travel alert']
}, (request, response) => {
  return Promise.all([getData(endpoint.alertsURL)]).then(res => modelData(res)).then(res => {
    response.say(`${res.alerts.description}`);
  }).catch(error => {
    response.say(`I'm sorry, but I'm having a little trouble with your request. It seems that there is the following error: ${error}.`);
  });
});

// Difference between a travel warning and travel alert (definitions)

app.intent('GetAlertAndWarningDefinition', {
  utterances: ['what is the difference between a warning and an alert']
}, (request, response) => {
  return Promise.all([getData(endpoint.warningsURL), getData(endpoint.alertsURL)]).then(res => modelData(res)).then(res => {
    response.say(`${res.warnings.description}. meanwhile, ${res.alerts.description}.`);
  }).catch(error => {
    response.say(`I'm sorry, but I'm having a little trouble with your request. It seems that there is the following error: ${error}.`);
  });
});

// Find country status

app.intent('GetCountryStatus', {
  slots: { country: 'AMAZON.Country' },
  utterances: ['is it safe in {-|country}', 'should I visit {-|country}', 'is it ok to visit {-|country}', 'is it dangerous in {-|country}', 'how are things in {-|country}', 'what is the status of {-|country}', 'what is going on in {-|country}', 'is there any reason to not visit {-|country}', 'does {-|country} have any warnings or alerts']
}, (request, response) => {
  const phrase = request.slot('country').toLowerCase();

  return Promise.all([getData(endpoint.warningsURL), getData(endpoint.alertsURL)]).then(res => modelData(res)).then(res => {
    let searchResult = null;

    res.warnings.list.forEach(item => {
      if (item.country.includes(phrase)) {
        searchResult = {
          type: 'warning',
          details: item
        };
      }
    });

    res.alerts.list.forEach(item => {
      if (item.country.includes(phrase)) {
        searchResult = {
          type: 'warning',
          details: item
        };
      }
    });

    if (searchResult) {
      response.say(`There is currently a travel ${searchResult.type} in effect for ${searchResult.details.country}. This travel ${searchResult.type} was issued on ${searchResult.details.issuedAt}. ${searchResult.details.description}. For the most accurate and up to date travel advisories, please visit the U.S. State Department's web site at www.state.gov or by calling the State Department directly at (202) 647-6575.`);
    } else {
      response.say(`I don't see any current travel warnings or alerts for ${phrase}, however, for the most accurate and up to date travel advisories, please visit the U.S. State Department's web site at www.state.gov or by calling the State Department directly at (202) 647-6575.`);
    }
  }).catch(error => {
    response.say(`I'm sorry, but I'm having a little trouble with your request. You can ask things like: "Is it safe in Syria?" or "What is the status of Sudan?". You can even get information explaining the different types of advisories, by asking things like, "What is the difference between a warning and an alert?". Go ahead, ask away.'`);
  });
});

//  Find number of total warnings and alerts

app.intent('GetCount', {
  utterances: ['how many alerts are there', 'how many alerts are issued', 'how many warnings are there', 'how many warnings are issued']
}, (request, response) => {
  return Promise.all([getData(endpoint.warningsURL), getData(endpoint.alertsURL)]).then(res => modelData(res)).then(res => {
    const warningPlaces = [];
    const alertPlaces = [];

    res.alerts.list.forEach(item => alertPlaces.push(item.country));
    res.warnings.list.forEach(item => warningPlaces.push(item.country));

    response.say(`The U.S. State Department currently has ${res.alerts.list.length} issued travel alerts and ${res.warnings.list.length} issued travel warnings. Travel alerts have been issued for the following reasons: ${alertPlaces.join(', ')}. Travel warnings have been issued for the following ${res.warnings.list.length} countries: ${warningPlaces.join(', ').sort()}`);
  }).catch(error => {
    response.say(`I'm sorry, but I'm having a little trouble with your request. It seems that there is the following error: ${error}.`);
  });
});

exports.handler = app.lambda();