/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'steamcircle',
    podModulePrefix: 'steamcircle/pods',
    usePodsByDefault: true,
    firebase_instance: process.env.FIREBASE_URL,
    typekitId: process.env.TYPEKIT_ID,
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
      sessionServiceName: 'session',
      providers: {
        'github-oauth2': {
          apiKey: process.env.GITHUB_ID,
          redirectUri: 'http://localhost:4200/login'
        }
      }
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' 'unsafe-inline' use.typekit.net",
      'connect-src': "'self' www.google-analytics.com wss://*.firebaseio.com api.steampowered.com",
      'font-src': "'self' data:",
      'img-src': "'self' p.typekit.net google-analytics.com",
      'style-src': "'self' 'unsafe-inline' use.typekit.net fonts.googleapis.com",
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
