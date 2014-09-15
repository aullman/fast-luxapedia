angular.module('luxapedia', ['ngRoute', 'ngResource'])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/pokemon/:pokemonId', {
        templateUrl: 'partials/pokemon-detail.html',
        controller: 'PokemonDetailCtrl'
      });
  }]);