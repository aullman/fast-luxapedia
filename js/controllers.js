var pokemonDictionary = {};
angular.module('luxapedia')
    .controller('PokedexCtrl', ['$scope', 'Pokedex', function($scope, Pokedex) {
        $scope.pokedex = Pokedex.query(function () {
          $scope.pokedex.forEach(function (pokemon) {
            pokemonDictionary[pokemon.id] = pokemon.name;
          });
        });
        
        $scope.getPokemon = function (uri) {
            alert(uri);
        };
    }])
    .controller('PokemonDetailCtrl', ['$scope', '$routeParams', 'Pokemon',
         function ($scope, $routeParams, Pokemon) {
             $scope.pokemonId = $routeParams.pokemonId;
             $scope.pokemon = Pokemon.get({id: $routeParams.pokemonId}, function (pokemon) {
               pokemon.evolutions.forEach(function (evolution) {
                 evolution.id = evolution.resource_uri.match(/api\/v1\/pokemon\/(\d+)\//)[1];
                 evolution.name = pokemonDictionary[evolution.id];
               });
               
             });
    }]);