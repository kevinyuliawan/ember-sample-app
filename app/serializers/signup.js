import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  extractArray: function(store, type, payload){
    var data = {signups: payload};
    return this._super(store, type, data);
  }
});