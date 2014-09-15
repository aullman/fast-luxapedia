angular.module('luxapedia')
    .controller('PokedexCtrl', ['$scope', 'Pokedex', function($scope, Pokedex) {
        $scope.pokedex = Pokedex.query();
        
        $scope.getPokemon = function (uri) {
            alert(uri);
        };
    }])
    .controller('PokemonDetailCtrl', ['$scope', '$routeParams', 'Pokemon',
         function ($scope, $routeParams, Pokemon) {
             $scope.pokemonId = $routeParams.pokemonId;
             $scope.pokemon = Pokemon.get({id: $routeParams.pokemonId});
    }]);