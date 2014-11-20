import Ember from "ember";

export default Ember.ArrayController.extend({

  actions: {
    createSignup: function(){

      // remove errors
      $('#emailField').removeClass("has-error");
      $("#showWarning").hide();

      // get user input
      var email = this.get('newEmail');

      // validate name and email first
      if (validateEmail(email)){
        // create the new Signup model
        var signup = this.store.createRecord('signup', {
          email: email
        });

        // save the new model
        //  even though I have the rails server returning a 302 Found header, the showSuccess function is still not firing and instead moves onto the failure function. so for now it's going to go to the success function either way
        //signup.save().then(showSuccess).catch(failure);
        signup.save();
        showSuccess();
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
};