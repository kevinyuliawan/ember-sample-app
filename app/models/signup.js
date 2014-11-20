import DS from 'ember-data';

var Signup = DS.Model.extend({
  email: DS.attr('string')
});

Signup.reopenClass({
  FIXTURES: [
    {
      id: 1,
      email: 'john@gmail.com'
    },
    {
      id: 2,
      email: 'jane@gmail.com'
    },
    {
      id: 3,
      email: 'obama@whitehouse.gov'
    }
  ]
});

export default Signup;