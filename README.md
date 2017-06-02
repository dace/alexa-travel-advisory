# Travel Advisory

![Amazon Alexa logo](./docs/amazon_alexa_logo.jpg)

Travel Advisory is an Amazon Alexa skill built on top of NodeJS. It uses [XML feeds from the U.S. State Department](https://www.state.gov/developer/) to provide up to date international travel warnings and alerts.

**NOTE**: This skill currently pulls from the State Department's XML feeds directly. Working on de-coupling data fetching from core functionality by creating a separate NodeJS server that pulls, normalizes and provides a cleaner API that the skill can interact with. Source code for this project will be found [here](https://github.com/hidace/alexa-travel-advisory-api).

# Questions you can ask

This skill allows for the following type of questions:

### Definitions
- "What is a travel warning?"
- "What is a travel alert?"
- "What's the difference between a warning and an alert?"

### Specific country information

- "Is it safe in (country name)?"
- "Should I visit (country name)?"
- "Is it ok to visit (country name)?"
- "Is it dangerous in (country name)?"
- "What's going on in (country name)?"
 - "Is there any reason to not visit (country name)?"
- "Does (country name) have any warnings or alerts?"

### Quantity issued

- "How many current warnings and alerts are issued?"
- "How many current alerts are there?"
- "How many current warnings are there?"
