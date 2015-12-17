'use strict';

angular.module('myApp.topics', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/topics/:user', {
    templateUrl: 'topics/topics.html',
    controller: 'TopicsCtrl'
  });
}])

.constant('_', window._)


.controller('TopicsCtrl', ['$scope', '$http',  '$routeParams', '_', function ($scope, $http, $routeParams, _) {

  $scope.flip = function(topic) {
    console.log(topic.class);
    if(topic.class === 'flipped'){topic.class = 'notflipped';}
    else {topic.class = 'flipped';}
  };


    $http.get('/app/data/topics.json').success(function(response) {
      $scope.topics = response;
      $scope.currentUser = $routeParams.user;
      $scope.currentUserRole = '';
      $scope.showMine = true;

      $http.get('/app/data/topicToUser.json').success(function(responseForTopicsToUser) {
        var topicsToUsers = responseForTopicsToUser;
        var topicsIdsForThisUser = [];
        for(var i=0; i<topicsToUsers.length; i++) {
         if (topicsToUsers[i].userid == $routeParams.user) {
          topicsIdsForThisUser.push(topicsToUsers[i]);
          }
        }
       $scope.topicsForThisUsers = [];

        for(var i=0; i<$scope.topics.length; i++)
        {
          $scope.topics[i].class = 'notflipped';
          for(var j=0; j< topicsIdsForThisUser.length; j++)
          {
            $scope.topics[i].currentUserRole = '';
            if($scope.topics[i].topicid == topicsIdsForThisUser[j].topicid){
                if(topicsIdsForThisUser[j].role === 'L'){
                  $scope.topics[i].currentUserRole = 'Enrolled';
                }
                else{$scope.topics[i].currentUserRole = 'Teaching'; }
              $scope.topicsForThisUsers.push($scope.topics[i]);
              console.log($scope.topicsForThisUsers);
            }
          }
        }

        //console.log(_.filter(topicsToUsers, { 'userid' : '1' }));
        //var topicIdsForThisUser = _.pluck(_.filter(topicsToUsers, { 'userid' : '1' }), 'topicid');
        //$scope.topicsForThisUser = [];
        //$scope.topicsForThisUser.push(_.forEach(topicIdsForThisUser, function(topicId){
        //  _.findLast($scope.topics, function(topic){
        //    return topic
        //  });
        //}));

      });
    });

}]);
