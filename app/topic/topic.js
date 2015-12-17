'use strict';

angular.module('myApp.topic', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/topic/:id/:user', {
    templateUrl: 'topic/topic.html',
    controller: 'TopicCtrl'
  });
}])

.controller('TopicCtrl', ['$scope', '$http',  '$routeParams', '_', function ($scope, $http, $routeParams, _) {
    $scope.topicDetail = {};
    $scope.usersDetailsForThisTopic = [];
    $scope.currentUserRole = '';

    $scope.LearnerFilter = function (user) {
      return user.role === 'L' ;
    };
    $scope.TeacherFilter = function (user) {
      return user.role === 'T' ;
    };

    $scope.enrolStudent = function()
    {

    };



    $http.get('/app/data/topics.json').success(function (response) {
      var topics = response;
      for (var i = 0; i < topics.length; i++) {
        if (topics[i].topicid == $routeParams.id) {
          $scope.topicDetail = topics[i];
        }
      }
      $http.get('/app/data/topicToUser.json').success(function (responseForTopicsToUser) {
        var topicsToUsers = responseForTopicsToUser;
        var usersForThisTopic = [];
        for (var i = 0; i < topicsToUsers.length; i++) {
          if (topicsToUsers[i].topicid == $routeParams.id) {
            usersForThisTopic.push(topicsToUsers[i]);
            if(topicsToUsers[i].userid === $routeParams.user){
              if(topicsToUsers[i].role === 'L'){
                $scope.currentUserRole = 'Enrolled';
              }
              else{$scope.currentUserRole = 'Teaching'; }
            }
          }
        }
        $http.get('/app/data/user.json').success(function (responseForUsers) {
          var users = responseForUsers;
          for (var i = 0; i < users.length; i++) {
            for (var j = 0; j < usersForThisTopic.length; j++) {
              if (users[i].userid == usersForThisTopic[j].userid) {
                var user = users[i];
                user.role = usersForThisTopic[j].role;
                $scope.usersDetailsForThisTopic.push(users[i]);
              }
            }
          }
        });

      });
    })
  }]);