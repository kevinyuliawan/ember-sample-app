App.Router.map(function(){
  this.route('index', {path: '/'});

  this.resource('signups', function(){
    this.route('index', {path:'/' });
    this.route('admins');
    this.route('users');
  });
});

App.IndexRoute = Ember.Route.extend({
  renderTemplate: function(controller){
    this.render('index', {controller: 'signups'});
  }
});




App.SignupsRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('signup');
  }
});

App.SignupsIndexRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('signups');
  },
  renderTemplate: function(controller){
    this.render('signups/index', {controller: controller});
  }
});

App.SignupsAdminsRoute = Ember.Route.extend({
  model: function(){
    //get signups, return only those who are admins
    return this.store.filter('signup', function(signup){
      return todo.get('isAdmin');
    });
  },
  renderTemplate: function(controller){
    this.render('signups/index', {controller: controller});
  }
});

App.SignupsUsersRoute = Ember.Route.extend({
  model: function(){
    //get signups, return only those who are NOT admins
    return this.store.filter('signup', function(signup){
      return !todo.get('isAdmin');
    });
  },
  renderTemplate: function(controller){
    this.render('signups/index', {controller: controller});
  }
});