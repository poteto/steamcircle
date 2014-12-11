import DS from 'ember-data';

export default DS.Model.extend({
  steamid                  : DS.attr('string'),
  communityvisibilitystate : DS.attr('number'),
  profilestate             : DS.attr('number'),
  personaname              : DS.attr('string'),
  lastlogoff               : DS.attr('number'),
  profileurl               : DS.attr('string'),
  avatar                   : DS.attr('string'),
  avatarmedium             : DS.attr('string'),
  avatarfull               : DS.attr('string'),
  personastate             : DS.attr('number'),
  realname                 : DS.attr('string'),
  primaryclanid            : DS.attr('string'),
  timecreated              : DS.attr('number'),
  personastateflags        : DS.attr('number'),
  loccountrycode           : DS.attr('string')
});
