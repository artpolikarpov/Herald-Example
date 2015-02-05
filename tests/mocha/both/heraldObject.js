if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    

    describe("Herald object", function(){
      it("should exist", function(){
        chai.assert.isObject(Herald);
      });
      it("should have settings", function(){
        chai.assert.isObject(Herald.settings);
      });
      it("should have setting overrides", function(){
        chai.assert.isObject(Herald.settings.overrides);
      });
      it("should have setting queueTimer", function(){
        chai.assert.isNumber(Herald.settings.queueTimer);
        chai.assert(Herald.settings.queueTimer % 1 === 0);
      });
      it("should have setting userPreferenceDefault", function(){
        chai.assert.isBoolean(Herald.settings.userPreferenceDefault);
      });
      it("should have setting collectionName", function(){
        chai.assert.isString(Herald.settings.collectionName);
      });
      it("should have setting useIronRouter", function(){
        chai.assert.isBoolean(Herald.settings.useIronRouter);
      });
      it("should have _serverRunners", function(){
        chai.assert.isObject(Herald._serverRunners);
      });
      it("should have _clientRunners", function(){
        chai.assert.isObject(Herald._clientRunners);
      });
      it("should have _runnerCheckers", function(){
        chai.assert.isObject(Herald._runnerCheckers);
      });
      it("should have _couriers", function(){
        chai.assert.isObject(Herald._couriers);
      });
      it("should have _extentionParams", function(){
        chai.assert.isArray(Herald._extentionParams);
      });

      it("should have _message", function(){
        chai.assert.isObject(Herald._message);
      });
      it("should have _setProperty", function(){
        chai.assert.isObject(Herald._setProperty);
      });
      it("should have _getProperty", function(){
        chai.assert.isObject(Herald._getProperty);
      });
      it("should have _getUser", function(){
        chai.assert.isObject(Herald._getUser);
      });
      it("should have _getCourier", function(){
        chai.assert.isObject(Herald._getCourier);
      });
      it("should have _setCourier", function(){
        chai.assert.isObject(Herald._setCourier);
      });
    });

  describe("Herald._media", function(){
    before(function(done){
      Herald._serverRunners = {
        server1: {},
        server2: {}
      };
      Herald._clientRunners = {
        client1: {},
        client2: {}
      };
      done();
    });

    it("should have _media", function(){
      chai.assert.isFunction(Herald._media);
    });
    it("should return client and sever runners", function(){
      chai.assert.sameMembers(Herald._media(), ['server1', 'server2', 'client1', 'client2']);
    });
  });


});
}
