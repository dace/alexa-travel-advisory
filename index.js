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
//       // console.log(item.description.replace(/ *\<[^)]*\> */g, "").replace(/ *\&[^)]*\; */g, " "));
//     });
//   });

const requestUrl = 'https://travel.state.gov/_res/rss/TWs.xml';

const sendRequest = (requestUrl, callback) => {
  fetch(requestUrl)
    .then(res => res.text())
    .then(data => JSON.parse(parser.toJson(data)))
    .then(dataObj => {
      const advisoryDescription = dataObj.rss.channel.description;
      const advisories = dataObj.rss.channel.item;
      callback;
    })
    .catch(err => {
      response.say('Sorry, but there appears to have been the following error when trying to process your request:', err);
    });
}
exports.handler = app.lambda();
