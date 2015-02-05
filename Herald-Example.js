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
    // Client-side Validation
    continuousValidation: true,
    showForgotPasswordLink: true
});
