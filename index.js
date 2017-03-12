// @flow
'use strict';

const alexa = require('alexa-app');
const fetch = require('node-fetch');
const parser = require('xml2json');

const app = new alexa.app('passport');

app.launch(function(request, response) {
  response.say('Welcome to Passport, where you can get info on current travel warnings and alerts issued by the U.S. State Department. Please, ask away...');
  // fetch('https://travel.state.gov/_res/rss/TWs.xml')
  //   .then(res => res.text())
  //   .then(data => JSON.parse(parser.toJson(data)))
  //   .then(dataObj => {
  //     const advisoryCount = dataObj.rss.channel.item.length;
  //     response.say(`There are currently ${advisoryCount} Travel Alerts.`);
  //   })
  //   .catch(err => {
  //     response.say('Sorry, but there appears to have been the following error when trying to process your request:', err);
  //   });
});

// fetch('https://travel.state.gov/_res/rss/TAs.xml')
//   .then(res => res.text())
//   .then(data => JSON.parse(parser.toJson(data)))
//   .then(dataObj => {
//     const description = dataObj.rss.channel.description;
//     const alerts = dataObj.rss.channel.item;
//     console.log(`There are currently ${alerts.length} Travel Alerts.`);
//     alerts.forEach(function(item, index) {
//       console.log(`Travel alert ${index + 1} relates to ${item.title.replace(/ Travel Alert */g, "")}. It was issued on ${item.pubDate}.`);
//       // console.log(item.description);
//     });
//   });

const warningsURL = 'https://travel.state.gov/_res/rss/TWs.xml';
const alertsURL = 'https://travel.state.gov/_res/rss/TAs.xml';

app.intent('GetCountryStatus', {
  slots: {
    country: 'AMAZON.Country',
  },
  utterances: [
    'is it safe in {-|country}',
  ]
}, (request, response) => {

  const phrase = request.slot('country');

  fetch(warningsURL)
    .then(res => res.text())
    .then(data => JSON.parse(parser.toJson(data)))
    .then(dataObj => {

      const {description} = dataObj.rss.channel;
      const advisories = dataObj.rss.channel.item;

      let countryStatus = {
        type: description,
        country: null,
        issuedAt: null,
        advisory: null,
      };

      advisories.map(item => {
        const country = item.title.replace(/ Travel Alert */g, "").replace(/ Travel Warning */g, "").toLowerCase();
        const setPhrase = phrase.toLowerCase();
        if (country === setPhrase) {
          countryStatus.country = country;
          countryStatus.issuedAt = item.pubDate;
          countryStatus.advisory = item.description;
        }
      });

      return countryStatus;
    })
    .then(statusObj => {
      if (statusObj.country) {
        response.say(`There is currently a travel warning in effect for ${statusObj.country}. ${statusObj.type} This travel warning was issued at ${statusObj.issuedAt}. ${statusObj.advisory}.`);
      } else {
        response.say(`I couldn\'t find a current travel warning for ${phrase} at the moment.`);
      }
    })
});

exports.handler = app.lambda();
