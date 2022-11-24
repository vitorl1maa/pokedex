const serchPokemon = document.querySelector('.search-pokemon');

serchPokemon.addEventListener('submit', function(event){
    // bloqueia o refresh da página
    event.preventDefault()
    // Url da pesquisa
    let urlPokemon = 'https://pokeapi.co/api/v2/pokemon/';
    // Valor do input
    let name = document.getElementById('txtBusca');

    // Concatena a url com o input txtBusca
    urlPokemon = urlPokemon + this.txtBusca.value;

    // Transforma os valores em letras minúsculas
    urlPokemon = urlPokemon.toLocaleLowerCase();

    // Class pokemon-info
    let pokemonInfo = document.getElementById('pokemon-info');

    // Class pokemon-image
    let imagePokemon = document.getElementById('pokemon-image');

    // Resposta em Html
    let html = ''

    fetch(urlPokemon)
        .then(pokemonInfo => pokemonInfo.json())
        .then(function(data){
            console.log(data)
            html = 'Nome: ' + maiuscula(data.name) + '<br>'
            html = html + 'Type: ' + maiuscula(data.types[0].type.name)
            pokemonInfo.innerHTML = html

            imagePokemon.innerHTML = "<img src = '" + data.sprites.front_default + "'><img src = '" + data.sprites.back_default + "'>"
        })

        .catch(function(err){
            if(err == 'SyntaxError: Unexpected token N in JSON at position 0'){
                html = 'Pokémon não encontrado'
            } else {
                html =  err
            }
            console.log(err)

            pokemonInfo.innerHTML = html
        });

    
});

function maiuscula(value){
    return value[0].toUpperCase() + value.substr(1);
}