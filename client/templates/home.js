Template.home.events({
    "click .my-avatar": function(event, template){
       Router.go("/profile");
    },
    "click .my-signature": function(event, template){
        Router.go("/signature");
    }
});