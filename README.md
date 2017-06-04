# Travel Advisory

![Amazon Alexa logo](./docs/amazon_alexa_logo.jpg)

[You can read more in-depth details about this project here.](https://medium.com/@hidace/programmatically-designing-a-voice-user-interface-vui-with-amazons-alexa-and-nodejs-5f36a1e5bbfe)

[Travel Advisory](https://medium.com/@hidace/programmatically-designing-a-voice-user-interface-vui-with-amazons-alexa-and-nodejs-5f36a1e5bbfe) is an Amazon Alexa skill built on top of NodeJS. It uses [RSS feeds from the U.S. State Department](https://www.state.gov/developer/) to provide up to date international travel warnings and alerts.

**NOTE**: This skill currently pulls from the State Department's RSS feeds directly. Working on de-coupling data fetching from core functionality by creating a separate NodeJS server that pulls, normalizes and provides a cleaner API that the skill can interact with. Source code for this project will be found [here](https://github.com/hidace/alexa-travel-advisory-api).

# Demo Videos

![Demo video screenshot](./docs/video.png)

Below are video examples demonstrating the skill. 

[Video 1: Difference between an alert and a warning (0:59)](https://vimeo.com/220098425)

[Video 2: Country without an advisory (0:30)](https://vimeo.com/220097793)

[Video 3: Country with a current advisory (6:15)](https://vimeo.com/220102712)