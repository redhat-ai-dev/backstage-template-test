# backstage-template-test
A simple test library to validate nunjucks templates used in Backstage software templates

This repository contains a basic testing library for the Nunjucks templates used in Backstage software templates. This library is written using the [ts-jest](https://github.com/kulshekhar/ts-jest) and [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) libraries.

## Prerequisites

- Node.js v18 or later
- [yarn](https://yarnpkg.com/)

## Running the sample tests

1) `yarn install`
2) `yarn test`

## Using the testing library

1) Run `yarn add -D backstage-template-test` to pull in the testing library to your project

2) Describe test case and inputs, based on the [format used by jest](https://jestjs.io/docs/getting-started):

<img width="815" alt="Image" src="https://github.com/user-attachments/assets/2f86e045-5c71-4fef-a750-0d4841f8b11e" />

2) Add any necessary test data under the test folder as needed - if validating multiple files at once, ensure the test data file names match the templated file names