var request = require('request'),
  fs = require('fs'),
  cheerio = require('cheerio'),
  pokedex = [];

request({
  url: 'http://pokeapi.co/api/v1/pokedex/1/',
  json: true
}, function (error, response, data) {
  if (error) {
    console.error(error);
    return;
  }
  data.pokemon.forEach(function (pokemon) {
    // Write out the pokemon to file
    var pokemonId = pokemon.resource_uri.match(/api\/v1\/pokemon\/(\d+)\//)[1];
    request('http://pokeapi.co/' + pokemon.resource_uri, function (err, response, body) {
      if (err) {
        console.log("ERROR: ", err);
        return;
      }
      var pokemon;
      try {
        pokemon = JSON.parse(body);
      } catch (e) {
        console.log("ERROR: ", e);
        return;
      }
      pokedex.push({
        id : parseInt(pokemonId, 10),
        name: pokemon.name,
        type: pokemon.types[0].name,
        image: 'http://pokeapi.co/media/img/' + pokemonId + '.png',
        uri: '/pokemon/' + pokemonId + '/'
      });
      // Fetch large image
      var paddedId = pokemonId < 10 ? '00' + pokemonId : (pokemonId < 100 ? '0' + pokemonId : pokemonId);
      request('http://bulbapedia.bulbagarden.net/wiki/File:' + paddedId + pokemon.name + '.png', function (err, response, body) {
        var $ = cheerio.load(body),
          largeImageSrc = $('div#file a').attr('href');
        if (largeImageSrc) {
          console.log('Found large image: ' + largeImageSrc);
          pokemon.largeImage = largeImageSrc;
        }
        fs.writeFile('pokemon/' + pokemonId + '.json', JSON.stringify(pokemon), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('The file was saved for ' + pokemon.name);
            }
        });
      });
      
      if (pokedex.length === data.pokemon.length) {
        // We have fetched all of the pokemon, let's write out our pokedex
        fs.writeFile('pokedex.json', JSON.stringify(pokedex), function(err) {
          if (err) console.log(err);
          else console.log('We wrote out the pokedex!');
        });
      }
    });
  });
});