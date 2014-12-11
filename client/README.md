# steamcircle

[![Circle CI](https://circleci.com/gh/poteto/steamcircle.svg?style=svg)](https://circleci.com/gh/poteto/steamcircle)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)
* [Ember-cli](http://www.ember-cli.com)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

When using Ember generators, suffix with `--pod`.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

The app is continuously deployed on Heroku via CircleCI. There is a `Procfile` that runs an Express app (`index.js`).

### Environment Variables

The app uses `ember-cli-dotenv` to manage environment variables. 

- `TYPEKIT_ID` for custom webfonts powered by [Typekit](https://typekit.com/)
- `FIREBASE_URL` for your [Firebase](https://www.firebase.com/) db
– `STEAM_API_KEY` for accessing the Steam API. Get your own API key [here](http://steamcommunity.com/dev/apikey)

When developing locally, edit your `.env.example` with your keys and save it in the root folder as `.env`. You'll need to provide these for deployment as well.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
