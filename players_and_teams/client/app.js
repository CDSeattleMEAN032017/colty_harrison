var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/players', {
        templateUrl: 'partials/players.html',
        controller: 'PlayersController'
    })
    .when('/teams', {
        templateUrl: 'partials/teams.html',
        controller: 'TeamsController'
    })
    .when('/associations', {
        templateUrl: 'partials/associations.html',
        controller: 'AssociationsController'
    })
    .otherwise({
        redirectTo: '/players'
    });
});
app.factory('playerFactory', function() {
    var factory = {};
    var players = [
        {name: "Speros", team: 'Seahawks'},
        {name: "Colty", team: 'Cowboys'},
        {name: "Chaya", team: ""}
    ];

    factory.index = function(callback) {
        callback(players);
    };

    factory.create = function(player, callback) {
        player.team = '';
        players.push(player);
        callback(players);
    };

    factory.delete = function(player, callback) {
        players.splice(players.indexOf(player), 1);
        callback(players);
    };

    factory.addToTeam = function(data, callback) {
        if ('player' in data && 'team' in data) {
            players[data.player].team = data.team;
            callback(players);
        }
    };

    factory.removeFromTeam = function(id, callback) {
        players[id].team = '';
        callback(players);
    };
    return factory;
});

app.factory('teamFactory', function() {
    var factory = {};
    var teams = [
        {name:"Seahawks"},
        {name:"49ers"},
        {name:"Cowboys"},
        {name: "Longhorns"}
    ];

    factory.index = function(callback) {
        callback(teams);
    };

    factory.create = function(team, callback) {
        teams.push(team);
        callback(teams);
    };

    factory.delete = function(team, callback) {
        teams.splice(teams.indexOf(team), 1);
        callback(teams);
    };

    return factory;
});

app.controller('PlayersController', ['$scope', 'playerFactory', function($scope, playerFactory) {
    $scope.players = [];
    $scope.player = {};
    function setPlayers(data) {
        $scope.players = data;
        $scope.player = {};
    }
    $scope.index = function() {
        playerFactory.index(setPlayers);
    };
    $scope.index();
    $scope.addPlayer = function() {
        playerFactory.create($scope.player, setPlayers);
    };

    $scope.removePlayer = function(player) {
        playerFactory.delete(player, setPlayers);
    };
}]);

app.controller('TeamsController', ['$scope', 'teamFactory', function($scope, teamFactory) {
    $scope.teams = [];
    $scope.team = {};
    function setTeams(data) {
        $scope.teams = data;
        $scope.team = {};
    }

    $scope.index = function() {
        teamFactory.index(setTeams);
    };
    $scope.index();
    $scope.addTeam = function() {
        teamFactory.create($scope.team, setTeams);
    };

    $scope.removeTeam = function(team) {
        teamFactory.delete(team, setTeams);
    };
}]);

app.controller('AssociationsController', ['$scope', 'playerFactory', 'teamFactory', function($scope, playerFactory, teamFactory) {
    $scope.assignment = {};
    $scope.teams = [];
    $scope.players = [];
    function setTeams(data) {
        $scope.teams = data;
    }
    function setPlayers(data) {
        $scope.players = data;
        $scope.player = {};
    }
    playerFactory.index(setPlayers);
    teamFactory.index(setTeams);
    $scope.assignPlayer = function() {
        playerFactory.addToTeam($scope.assignment, setPlayers);
        $scope.assignment = {};
    };

    $scope.removeAssign = function(id) {
        playerFactory.removeFromTeam(id, setPlayers);
    };
}]);
