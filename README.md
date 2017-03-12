# Passport

![Amazon Alexa logo](./docs/amazon_alexa_logo.jpg)

# Questions you can ask

This skill allows for the following questions:

- Is it safe to visit [country] / Are there any warnings or alerts for [country]?
- How many travel alerts / warnings are there?
- List of travel warnings
- List of travel alerts


# Testing

This project uses Facebook's Jest for testing and Flow for static type checking. Because flow annotations appear within the source files, running tests on these files would cause errors. Therefore, this project uses Babel's `babel-plugin-transform-flow-strip-types` to remove annotations.

To run tests, from the command line, simply type:

`test`

This will:

1. Copy source files for production and place them within the root's `/public` directory.
2. Run babel to strip these files of all their flow annotations.
3. Run jest for testing on these files.
