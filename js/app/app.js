window.App = Ember.Application.create({
  LOG_TRANSITIONS: true //for debugging routes
});

// App.ApplicationAdapter = DS.FixtureAdapter.extend(); //for fixtures in models/signup.js , eventually change to Mailchimp API

App.SignupAdapter = DS.RESTAdapter.extend({
  createRecord: function(store, type, record){ // signup.save();
    var data = { //initialize with needed apikey and id
      "apikey" : "10fd04cf074e985b4ae10acdb68082c8-us9",
      "id" : "bbc3858cd3"
    };
    data["email"] = this.serialize(record);
    return this.ajax("https://us9.api.mailchimp.com/2.0/lists/subscribe.json", "POST", {data: data, dataType: 'json', contentType: 'application/json; charset=UTF-8' }); // POST to /subscribe.json
  },

  findAll: function(store, type, sinceToken){ // store.find('signup')
    var data = {
      "apikey" : "10fd04cf074e985b4ae10acdb68082c8-us9",
      "id" : "bbc3858cd3"
    };
    if (sinceToken) {
      data["since"] = sinceToken;
    };
    return this.ajax("https://us9.api.mailchimp.com/2.0/lists/members.json", 'POST', { data: data, dataType: 'json', contentType: 'application/json; charset=UTF-8' });
  }
});

App.SignupSerializer = DS.RESTSerializer.extend({ // change the payload's data to the key of 'signups' bc that's what Ember looks for (originally Mailchimp's payload is {total: 'x', data: []} )
  extractArray: function(store, type, payload){
    var data = {signups: payload["data"]}
    return this._super(store, type, data);
  }
});