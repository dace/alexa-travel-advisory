# Travel Advisory

![Amazon Alexa logo](./docs/amazon_alexa_logo.jpg)

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

# Testing

This project uses Facebook's Jest for testing and Flow for static type checking. Because flow annotations appear within the source files, running tests on these files would cause errors. Therefore, this project uses Babel's `babel-plugin-transform-flow-strip-types` to remove annotations.

To run tests, from the command line, simply type:

`test`

This will:

1. Copy source files for production and place them within the root's `/public` directory.
2. Run babel to strip these files of all their flow annotations.
3. Run jest for testing on these files.
