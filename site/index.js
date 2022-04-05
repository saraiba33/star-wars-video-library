const url = "https://swapi.dev/api/films";
const spinner = document.querySelector(".spinner")

const starWarsIdMap = {
    1: 4,
    2: 5,
    3: 6,
    4: 1,
    5: 2,
    6: 3
}


function createDiv(parsedObject) {
    const div = document.createElement("div")
    div.classList.add("movie-listing")
    const newId = starWarsIdMap[parsedObject.episode_id]
    div.innerHTML = `
<img src="${newId}.JPG" alt=${parsedObject.title}>
    <a href="movie.html?films=${parsedObject.episode_id}">${parsedObject.title}</a>
    <time>${dateConverter(parsedObject.release_date)}</time>
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
                spinner.classList.add("hidden")
                parsedResponse.forEach(parsedResponse => {
                    createDiv(parsedResponse)
                })
            })
    })

function dateConverter(date) {
    const [year, month, day] = date.split("-");
    const result = [month, day, year].join("/");
    return result;
}