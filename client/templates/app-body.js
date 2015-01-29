var ANIMATION_DURATION = 300;
var NOTIFICATION_TIMEOUT = 3000;
//var TAB_KEY = 'tab';
var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
var CONNECTION_ISSUE_TIMEOUT = 5000;

Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);
//Session.setDefault(MENU_KEY, false);

// XXX: this work around until IR properly supports this
// IR refactor will include Location.back, which will ensure that initator is
// set
var nextInitiator = null, initiator = null;
Deps.autorun(function() {
    // add a dep
    Router.current();

    initiator = nextInitiator;
    nextInitiator = null;
});

Meteor.startup(function () {
    // Only show the connection error box if it has been 5 seconds since
    // the app started
    setTimeout(function () {
        // Launch screen handle created in lib/router.js
        dataReadyHold.release();

        // Show the connection error box
        Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
    }, CONNECTION_ISSUE_TIMEOUT);
});

Template.appBody.rendered = function() {
    this.find("#content-container")._uihooks = {
        insertElement: function(node, next) {
            // short-circuit and just do it right away
            if (initiator === 'menu')
                return $(node).insertBefore(next);

            var start = (initiator === 'back') ? '-100%' : '100%';

            $.Velocity.hook(node, 'translateX', start);
            $(node)
                .insertBefore(next)
                .velocity({translateX: [0, start]}, {
                    duration: ANIMATION_DURATION,
                    easing: 'ease-in-out',
                    queue: false
                });
        },
        removeElement: function(node) {
            if (initiator === 'menu')
                return $(node).remove();

            var end = (initiator === 'back') ? '100%' : '-100%';

            $(node)
                .velocity({translateX: end}, {
                    duration: ANIMATION_DURATION,
                    easing: 'ease-in-out',
                    queue: false,
                    complete: function() {
                        $(node).remove();
                    }
                });
        }
    };
}

Template.appBody.helpers({
    overlayOpen: function() {
        return Overlay.isOpen() ? 'overlay-open' : '';
    },
    connected: function() {
        if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
            return Meteor.status().connected;
        } else {
            return true;
        }
    }
})

Template.appBody.helpers({
    'click .js-back': function(event) {
        nextInitiator = 'back';

        // XXX: set the back transition via Location.back() when IR 1.0 hits
        history.back();
        event.stopImmediatePropagation();
        event.preventDefault();
    }
});