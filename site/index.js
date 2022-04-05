const url = "https://swapi.dev/api/films";


fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const movies = parsedResponse.results
        console.log(movies)
    })