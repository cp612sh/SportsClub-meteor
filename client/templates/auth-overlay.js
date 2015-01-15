// If the auth overlay is on the screen but the user is logged in,
//   then we have come back from the loginWithTwitter flow,
//   and the user has successfully signed in.
//
// We have to use an autorun for this as callbacks get lost in the
//   redirect flow.
Template.authOverlay.events({
  'submit form': function(event) {
    event.preventDefault();
    var userName = event.target.userName.value;
    var userPassword = event.target.userPassword.value;

    Meteor.loginWithPassword(
        userName,
        userPassword,
        function(error){
          if(error){
            alert(error);
            return;
          }
          else{
            Router.go("/");
          }
    });
  }
});