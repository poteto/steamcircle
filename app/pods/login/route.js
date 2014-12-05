import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    signInViaGithub: function(){
      var route = this,
          controller = this.controllerFor('login');
      this.get('session').authenticate('simple-auth-authenticator:torii', 'github-oauth2').then(function(){
          route.transitionTo('application');
      }, function(error){
        controller.set('error', 'Could not sign you in: '+error.message);
      });
    }
  }
});
