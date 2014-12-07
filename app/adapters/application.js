import DS from 'ember-data';
import config from '../config/environment';

export default DS.FirebaseAdapter.extend({
  firebase: new window.Firebase('https://' + config.firebase_instance + '.firebaseio.com')
});
