const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const movie = document.querySelector("movie")

fetch("https://swapi.dev/api/films/1")
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        console.log(parsedResponse)
    })