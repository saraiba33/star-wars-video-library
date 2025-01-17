const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const spinner = document.querySelector(".spinner")

const starWarsIdMap = {
    1: 4,
    2: 5,
    3: 6,
    4: 1,
    5: 2,
    6: 3
}


const newId = starWarsIdMap[queryString.get("films")]

fetch(`https://swapi.dev/api/films/${newId}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        createDiv(parsedResponse)
        createCharacterList(parsedResponse)
        spinner.classList.add("hidden")
    })

function createCharacterList(parsedObject) {
    const characterUrls = parsedObject.characters
    characterUrls.forEach(characterUrl => {
        fetch(characterUrl).then(response => {
            return response.json()
        }).then(parsedResponse => {
            const li = document.createElement("li")
            li.textContent = parsedResponse.name
            const ul = document.querySelector(".characters")
            ul.append(li)
        })

    });
}

function createDiv(parsedObject) {
    const div = document.createElement("div")
    div.classList.add("movie")
    div.innerHTML = `<a href=> ${parsedObject.title}</a>
    <time>${dateConverter(parsedObject.release_date)}</time>
    <img src="${newId}.JPG" alt=${parsedObject.title}>
    <h2>Opening Crawl</h2>
        <div class=crawl>${parsedObject.opening_crawl}</div>
    <h2> Characters</h2 >
        <ul class="characters"></ul>
    `
    const main = document.querySelector("main")
    main.append(div)
}

function dateConverter(date) {
    const [year, month, day] = date.split("-");
    const result = [month, day, year].join("/");
    return result;
}