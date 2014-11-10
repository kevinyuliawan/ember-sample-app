window.App = Ember.Application.create({
  LOG_TRANSITIONS: true //for debugging routes
});

// App.ApplicationAdapter = DS.FixtureAdapter.extend(); //for fixtures in models/signup.js , eventually change to Mailchimp API

App.SignupAdapter = DS.RESTAdapter.extend({
  createRecord: function(store, type, record){
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record, {includeId: false}); //dont need ID for mailchimp
    return this.ajax(this.buildURL+'subscribe.json', "POST", {data: data}); // POST to /subscribe.json
  },

  findAll: function(store, type, sinceToken){ // store.find('signup')
    var query = {
      "apikey": "10fd04cf074e985b4ae10acdb68082c8-us9",
      "id": "bbc3858cd3",
    };
    if (sinceToken) {
      query["since"] = sinceToken;
    };
    return this.ajax("https://us9.api.mailchimp.com/2.0/lists/members.json", 'POST', { data: query, dataType: 'json', contentType: 'application/json; charset=UTF-8' });
  }
});

App.SignupSerializer = DS.RESTSerializer.extend({ // change the payload's data to the key of 'signups' bc that's what Ember looks for (originally payload is {total: 'x', data: []} )
  extractArray: function(store, type, payload){
    var query = {signups: payload["data"]}
    return this._super(store, type, query);
  }
});