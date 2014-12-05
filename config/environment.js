/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'gitspace',
    podModulePrefix: 'gitspace/pods',
    firebase_instance: process.env.FIREBASE_URL,
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    torii: {
      providers: {
        'github-oauth2': {
          apiKey: process.env.GITHUB_ID,
          redirectUri: 'http://localhost:4200/login'
        }
      }
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' 'unsafe-inline' www.google-analytics.com",
      'connect-src': "'self' www.google-analytics.com wss://*.firebaseio.com",
      'font-src': "'self' http://fonts.gstatic.com http://maxcdn.bootstrapcdn.com",
      'img-src': "'self' www.google-analytics.com",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com http://maxcdn.bootstrapcdn.com",
      'media-src': "'self'"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
