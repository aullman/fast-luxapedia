angular.module('luxapedia')
.factory('Pokemon', ['$resource',
  function($resource){
    return $resource('pokemon/:id.json', {}, {
      query: {method:'GET', params:{id:1}, isArray:false}
    });
  }])
.factory('Pokedex', ['$resource',
  function($resource){
    return $resource('pokedex.json', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);