'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));

  describe('topics controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('TopicsCtrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});