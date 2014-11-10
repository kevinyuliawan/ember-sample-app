App.SignupsController = Ember.ArrayController.extend({
  actions: {
    createSignup: function(){

      // remove errors
      $('#nameField').removeClass("has-error");
      $('#emailField').removeClass("has-error");
      $("#showWarning").hide();

      // get user input
      name = this.get('newName');
      email = this.get('newEmail');
      var isAdmin = this.get('isAdmin');

      // validate name and email first
      if (name != '' && validateName(name) && validateEmail(email)){
        // create the new Signup model
        var signup = this.store.createRecord('signup', {
          name: name,
          email: email,
          isAdmin: isAdmin
        });

        // save the new model
        signup.save();
      }
      else{
        //add errors
        if(name == '' || !validateName(name)) { $('#nameField').addClass("has-error")};
        if(!validateEmail(email)){ $('#emailField').addClass("has-error")};
        $("#showWarning").fadeIn(1500);
      };
    } //end createSignup
  }, // end actions



});

function validateEmail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateName(name){
      var re = /^[A-Za-z ]+$/;
      return re.test(name);
}