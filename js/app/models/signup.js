App.Signup = DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  isAdmin: DS.attr('boolean')
});

App.Signup.FIXTURES = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@gmail.com',
    isAdmin: false
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    isAdmin: false
  },
  {
    id: 3,
    name: 'Barack Obama',
    email: 'obama@whitehouse.gov',
    isAdmin: true
  }
];