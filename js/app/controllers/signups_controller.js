App.SignupsController = Ember.ArrayController.extend({
  actions: {
    createSignup: function(){

      // remove errors
      $('#emailField').removeClass("has-error");
      $("#showWarning").hide();

      // get user input
      email = this.get('newEmail');

      // validate name and email first
      if (validateEmail(email)){
        // create the new Signup model
        var signup = this.store.createRecord('signup', {
          email: email
        });

        // save the new model
        signup.save().then(showSuccess).catch(failure);
      }
      else{
        //add errors
        if(!validateEmail(email)){ $('#emailField').addClass("has-error")};
        $("#showWarning").fadeIn(1500);
      };
    } //end createSignup
  }, // end actions



});

function validateEmail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function showSuccess(){
  $('#modal-submit').modal('toggle');
  $("#emailField").children().prop('disabled', true);
};

function failure(reason){ //if email fails to save in mailchimp
  $("#showWarning").fadeIn(1500);
  console.log(reason); //diagnostic purposes
}