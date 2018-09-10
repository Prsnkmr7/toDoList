enguruBuild = angular.module('belong-app', ['ui.router']);

// Route Provider Starts

enguruBuild.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('Home', {
        url: '/',
        templateUrl: 'Templates/home.html'
    })
    .state('item', {
        url: '/item',
        templateUrl: 'Templates/details.html'
    })

        
});

// Home Controller logic

enguruBuild.controller('homeController', ['$scope', '$state', '$rootScope', function ($scope,  $state, $rootscope) {
    $scope.user = {};
    $scope.init = function () {
        if (!sessionStorage.user) {
            $scope.toDolist = [];
        }else{
            $scope.toDolist = JSON.parse(sessionStorage.user);
        }
    };

    $scope.submitForm = function (val) {
        if (val) {
            var data = {
                "name": $scope.user.name,
                "details": $scope.user.note,
                "selected": false
            };
            $scope.toDolist.push(data);
            $scope.clearData();
            storageToSession();
        }
    };

    $scope.ChnageSelected = function (val) {
        val.selected = event.target.checked;
        storageToSession();
    };

    var storageToSession = function () {
        sessionStorage.user = JSON.stringify($scope.toDolist);
    };

    $scope.clearData = function () {
        $scope.user.name = '';
        $scope.user.note = '';
    };

    $scope.clearAllData = function () {
        $scope.toDolist = [];
        storageToSession();
    };

    $scope.updateVal = function (data,val) {
        data.name = val;
        storageToSession();
    };

    $scope.delete = function (val) {
        var index = $scope.toDolist.indexOf(val);
        $scope.toDolist.splice(index, 1);
        storageToSession();
    };

    $scope.goToDetails = function () {
        $state.go('item');
    };

    $scope.init();
    

}]);
