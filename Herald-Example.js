//Create your courier
Herald.addCourier('clicked', {
  media: { onsite: {} },
  message: 'stuff'
});

//Create your notification
Meteor.methods({
  clicked: function () { 
    if (Meteor.server) {
      Herald.createNotification(this.userId, {courier: 'clicked'}); 
    }
  }
});


//very simple client logic
if (Meteor.isClient) {
  Template.hello.events({
    'click button': function () {
      Meteor.call('clicked', function (error, result) {});
    }
  });

  Template.notifications.helpers({
    notifications: function () {
      return Herald.collection.find({read: false});
    } 
  })

  Template.notifications.events({
    'click .remove': function (event, template) {
      Herald.collection.update(this._id, {$set: {read: true} });
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
