const url = "https://swapi.dev/api/films";


function createDiv(parsedObject) {
    const div = document.createElement("div")
    div.classList.add("movie-listing")
    div.innerHTML = `<a href="movie.html?films=${parsedObject.episode_id}">${parsedObject.title}</a>
    <time>${parsedObject.release_date}</time>
    <img src=xx alt=xx>
    `
    const ul = document.querySelector("ul")
    ul.append(div)
}

fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const movies = parsedResponse.results
        const movieUrls = movies.map(movie => movie.url)
        const movieFetches = movieUrls.map(url => fetch(url)
            .then(response => response.json()))
        return Promise.all(movieFetches)
            .then(parsedResponse => {
                //console.log(parsedResponse)
                parsedResponse.forEach(parsedResponse => {
                    createDiv(parsedResponse)
                    console.log(parsedResponse)
                })
            })
    })