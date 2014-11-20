import DS from 'ember-data';

// export default DS.FixtureAdapter.extend(); //for fixtures in models/signup.js , eventually change to Mailchimp API


export default DS.RESTAdapter.extend({

  createRecord: function(store, type, record){ // signup.save();
    /* not needed since apikey and ID are given by rails server
    var data = {
      "apikey" : "10fd04cf074e985b4ae10acdb68082c8-us9",
      "id" : "bbc3858cd3"
    };
    */
    var data = this.serialize(record);
    data["list_id"] = "bbc3858cd3";
    return this.ajax("lists/bbc3858cd3/subscribe", "POST", {data: data, dataType: 'json', contentType: 'application/json; charset=UTF-8' }); // POST to list_id/subscribe
  },

  findAll: function(store, type, sinceToken){ // store.find('signup')
    /* not needed since apikey and ID are given by rails server
    var data = {
      "apikey" : "10fd04cf074e985b4ae10acdb68082c8-us9",
      "id" : "bbc3858cd3"
    };
    */
    var data = {};
    if (sinceToken) {
      data["since"] = sinceToken;
    };

    return this.ajax("lists/bbc3858cd3.json", 'GET', { data: data, dataType: 'json', contentType: 'application/json; charset=UTF-8' });
  }
});

