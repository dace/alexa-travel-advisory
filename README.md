# Travel Advisory

![Amazon Alexa logo](./docs/amazon_alexa_logo.jpg)

Travel Advisory is an Amazon Alexa skill built on top of NodeJS. It uses [XML feeds from the U.S. State Department](https://www.state.gov/developer/) to provide up to date international travel warnings and alerts.

**NOTE**: This skill currently pulls from the State Department's XML feeds directly. Working on de-coupling data fetching from core functionality by creating a separate NodeJS server that pulls, normalizes and provides a cleaner API that the skill can interact with. Source code for this project will be found [here](https://github.com/hidace/alexa-travel-advisory-api).

# Demo Videos

![Demo video screenshot](./docs/video.png)

Below are video examples demonstrating the skill. 

[Video 1: Difference between a warning and an alert (0:59)](https://vimeo.com/220098425)

[Video 2: Country without an advisory (0:30)](https://vimeo.com/220097793)

Video 3: Country with a current advisory (coming soon)