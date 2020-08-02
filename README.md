# form-server
[![Build Status](https://travis-ci.com/mahsheikhdir/form-server.svg?branch=master)](https://travis-ci.com/mahsheikhdir/form-server)
[![Coverage Status](https://coveralls.io/repos/github/mahsheikhdir/form-server/badge.svg?branch=master)](https://coveralls.io/github/mahsheikhdir/form-server?branch=master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c09c0a7f517fa712543d/test_coverage)](https://codeclimate.com/github/mahsheikhdir/form-server/test_coverage)

A full-stack application using React and Express that lets users create and store JSON data for their website, or back-end projects. Users are given an API key for each of their "Projects" and can send POST requests to add new data. You can see this project here: [Link](https://jsonstor3.herokuapp.com/).

### Installing

```
yarn
```
Set up ```CONNECTION_STRING``` for PostgreSQL and ```SESSION_SECRET``` for use in sessions. Put them in a .env file.

### Basic Usage

After logging in users can create a Project in the "Projects" tab on the dashboard. They can then go to the find their API key in the "Your API Key" tab.

It should look something like this ```https://jsonstor3.herokuapp.com/private/v1/0ada1f6538dfdf2fd53e316a3282a48b0884db3a6fed1f74```

Any form of valid json can be sent and it will be stored to the database. On successful storage the server will return ```"Successfully stored to JSONstore: default"```.
To specify a form you can add a string to the end of the url like this ```https://jsonstor3.herokuapp.com/private/v1/0ada1f6538dfdf2fd53e316a3282a48b0884db3a6fed1f74/profile```.
On success server will return ```"Successfully stored to JSONstore: profile."```

All data can be downloaded in under the "Manage" tab. Users can download forms seperatly or all at once. 
As project data grows users can see how much space they are using under the "Projects" tab.

### Scripts

```
yarn start 
# Start app without nodemon

yarn startdev
# Starts app with nodemon

yarn lint
# run eslint

yarn runQuery
# Initializes the database (but also clears it)

yarn test
# Runs all tests in test file
```
