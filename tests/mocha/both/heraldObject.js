if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Herald object", function(){
      it("should exist", function(){
        chai.assert(Herald);
      });
      it("should have settings", function(){
        chai.assert(_.has( Herald, "settings"));
      });
      it("should have setting overrides", function(){
        chai.assert(_.has( Herald.settings, "overrides"));
      });
      it("should have setting queueTimer", function(){
        chai.assert(_.has( Herald.settings, "queueTimer"));
      });
      it("should have setting userPreferenceDefault", function(){
        chai.assert(_.has( Herald.settings, "userPreferenceDefault"));
      });
      it("should have setting collectionName", function(){
        chai.assert(_.has( Herald.settings, "collectionName"));
      });
      it("should have setting useIronRouter", function(){
        chai.assert(_.has( Herald.settings, "useIronRouter"));
      });
      it("should have _serverRunners", function(){
        chai.assert(_.has( Herald, "_serverRunners"));
      });
      it("should have _clientRunners", function(){
        chai.assert(_.has( Herald, "_clientRunners"));
      });
      it("should have _runnerCheckers", function(){
        chai.assert(_.has( Herald, "_runnerCheckers"));
      });
      it("should have _couriers", function(){
        chai.assert(_.has( Herald, "_couriers"));
      });
      it("should have _extentionParams", function(){
        chai.assert(_.has( Herald, "_extentionParams"));
      });
      it("should should have _media", function(){
        chai.assert(_.has( Herald, "_media"));
      });
      
    });
  });
}
