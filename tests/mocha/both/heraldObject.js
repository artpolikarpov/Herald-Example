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

      it("should be a function", function(){
        chai.assert.isFunction(Herald._media);
      });
      it("should return client and sever runners", function(){
        chai.assert.sameMembers(Herald._media(), ['server1', 'server2', 'client1', 'client2']);
      });
    });


    describe("Herald._message", function(){

      it("should be a function", function(){
        chai.assert.isFunction(Herald._message);
      });

      //TODO: lots more testing on this...
    });

    describe("Herald [[set]] / [[get]] property", function(){

      it("_setProperty should be a function", function(){
        chai.assert.isFunction(Herald._setProperty);
      });

      it("_setProperty should create an object", function(){
        chai.assert.deepEqual(Herald._setProperty('key', 'value'), {key: 'value'});
        chai.assert.notDeepEqual(Herald._setProperty('key', 'value'), {key: 'value', not: 'correct'});
      });

      it("_getProperty should be a function", function(){
        chai.assert.isFunction(Herald._getProperty);
      });

      it("_getProperty should reduced an object", function(){
        var testObj = { 
          a: {
            b: 'b'
          },
          b: {
            c: {
              d: 'd'
            }
          }
        }
        chai.assert.deepEqual(Herald._getProperty(testObj, 'a'), {b:'b'});
        chai.assert.deepEqual(Herald._getProperty(testObj, 'b.c'), {d:'d'});
      });      

    });

    describe("Herald._getUser", function(){

      it("should be a function", function(){
        chai.assert.isFunction(Herald._getUser);
      });

    });

    describe("Herald._getCourier", function(){
      beforeEach(function(done){
        Herald._couriers = {
          c1: {
            works: true
          },
          c2: {
            works: true,
            c3: {
              works: true
            }
          }
        };
        done();
      });
      afterEach(function (done) {
        Herald._couriers = {}
        done()
      });
      it("should be a function", function(){
        chai.assert.isFunction(Herald._getCourier);
      });

      it("should get couriers from Herald", function(){
        chai.assert.deepEqual(Herald._getCourier('c1'), { works: true });
        chai.assert.deepEqual(Herald._getCourier('c2.c3'), { works: true });
      });

      it("should get couriers from a couriers object", function(){
        var mockCouriers = {
          c1: {
            works: true
          },
          c2: {
            works: true,
            c3: {
              works: true
            }
          }
        };
        chai.assert.deepEqual(Herald._getCourier('c1', mockCouriers), { works: true });
        chai.assert.deepEqual(Herald._getCourier('c2.c3', mockCouriers), { works: true });
      });

    });
    describe("Herald._setCourier", function(){
      afterEach(function (done) {
        Herald._couriers = {}
        done()
      })

      it("should be a function", function(){
        chai.assert.isFunction(Herald._setCourier);
      });

      it("should set couriers on Herald", function(){
        chai.assert.deepEqual(Herald._setCourier('c1', {works: true}), { works: true });
        chai.assert.deepEqual(Herald._couriers, { c1: { works: true } });

        chai.assert.deepEqual(Herald._setCourier('c2.c3', {works: true}), { works: true });
        chai.assert.deepEqual(Herald._couriers, { c1: { works: true }, c2: { c3: { works: true } } });
      });

    });

  });
}
