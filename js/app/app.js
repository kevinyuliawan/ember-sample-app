window.App = Ember.Application.create({
  LOG_TRANSITIONS: true //for debugging routes
});

App.ApplicationAdapter = DS.FixtureAdapter.extend(); //for fixtures in models/signup.js , eventually change to Mailchimp API