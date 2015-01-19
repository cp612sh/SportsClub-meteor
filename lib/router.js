// Handle for launch screen possibly dismissed from app-body.js
dataReadyHold = null;

// Global subscriptions
if (Meteor.isClient) {

}

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound'
});

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}

HomeController = RouteController.extend({
  onBeforeAction: function() {
    //Router.go('/authOverlay');
  }
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('register',{ layoutTemplate: null });
  this.route('messenger');
  this.route('woyaotiqiu');
  this.route('more');
  this.route('authOverlay', { layoutTemplate: null });
  this.route('profile');
  this.route('signature');
  this.route('activeMatch');
  this.route('activeAccounting');
  this.route('activity');
  this.route('teamInformation');
});
