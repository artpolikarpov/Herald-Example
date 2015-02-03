//Create your courier
Herald.addCourier('clicked', {
  media: { onsite: {} },
  message: 'message'
});

//Create your notification
Meteor.methods({
  clicked: function (text) { 
    if (Meteor.server) {
      Herald.createNotification(this.userId, {courier: 'clicked', data: { text: 'text' }}); 
    }
  }
});


//very simple client logic
if (Meteor.isClient) {
  Template.hello.events({
    'click #addNote': function () {
      var text = ''
      Meteor.call('clicked', text, function (error, result) {});
    }
  });

  Template.notifications.helpers({
    notifications: function () {
      return Herald.collection.find({read: false});
    },
    message: function () {
      return Blaze.toHTML(this.message())
    }
  })

  Template.notifications.events({
    'click .remove': function (event, template) {
      Herald.collection.update(this._id, {$set: {read: true} });
    }
  });

  Template.Layout.rendered = function () {
    $(".button-collapse").sideNav();
  };

  Template.Layout.events({
    'click #logout': function () {
      Meteor.logout();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    ServiceConfiguration.configurations.remove({service: 'meteor-developer'});
    ServiceConfiguration.configurations.insert({
      service: 'meteor-developer',
      clientId: '39ENpQKv3xKxyKucs',
      secret: 'vrMXvfa2t6qAZ2PqDvihLs63iHLXgSFcYT'
    });
  });
}



// Routing and login.

Router.route('/herald', function () {
  this.layout('Layout');
  this.render('hello')
}, {
  name: 'herald'
})

AccountsTemplates.configure({
  homeRoutePath: '/herald'
});


AccountsTemplates.configureRoute('signIn', {
  path: '/'
});

Router.onBeforeAction(AccountsTemplates.ensureSignedIn, {only: ['herald']});


AccountsTemplates.configure({
    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,

    // Appearance
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: false,
    showPlaceholders: true,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/home',
    redirectTimeout: 4000,
});