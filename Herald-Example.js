//Create your courier
Herald.addCourier('clicked', {
  media: { onsite: {} },
  message: function () { return 'You clicked the button!'; }
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
    notificationsCount: function () {
      return Herald.collection.find({read: false}).count();
    },
    notifications: function () {
      return Herald.collection.find({read: false});
    } 
  })

  Template.notifications.events({
    'click .item': function (event, template) {
      Herald.collection.update(this._id, {$set: {read: true} });
    }
  });
}



// Routing and login.

Router.route('hello', { path: '/'})

Router.onBeforeAction(AccountsTemplates.ensureSignedIn, {only: ['hello']});
AccountsTemplates.init();
