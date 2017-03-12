// @flow
'use strict';

const alexa = require('alexa-app');
const fetch = require('node-fetch');
const parser = require('xml2json');
const https = require('https');


const app = new alexa.app('safe-travels');

app.launch((request, response) => {
  response.say('Welcome to Safe Travels, where you can get info on current travel warnings and alerts issued by the U.S. State Department. Please, ask away...');
});

https.get('https://travel.state.gov/_res/rss/TAs.xml', function(res) {
  res.on('data', chunk => {
    const data = parser.toJson(chunk);
    const dataObj = JSON.parse(data);
    const description = dataObj.rss.channel.description;
    const alerts = dataObj.rss.channel.item;

    console.log(`There are currently ${alerts.length} Travel Alerts.`);

    alerts.forEach(function(item, index) {
      console.log(`Travel alert number ${index + 1} is: ${item.title.replace(/ Travel Alert */g, "")}. It was published on ${item.pubDate}.`);
      // console.log(item.description.replace(/ *\<[^)]*\> */g, ""));
    });
  });
  // res.err('end', () => {
  //
  // })
});

exports.handler = app.lambda();
