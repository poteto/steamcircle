/* global Typekit */

import injectScript from 'ember-inject-script';
import ENV from '../config/environment';

export default {
  name: 'typekit',
  initialize: function() {
    var url = '//use.typekit.net/' + ENV.typekitId + '.js';
    injectScript(url).then(function() {
      Typekit.load();
    });
  }
};
