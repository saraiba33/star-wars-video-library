const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
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
        console.log(parsedResponse)
        createDiv(parsedResponse)
        createCharacterList(parsedResponse)
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
    console.log(characterUrls)
}



function createDiv(parsedObject) {
    const div = document.createElement("div")
    div.classList.add("movie")
    div.innerHTML = `<a href=> ${parsedObject.title}</a>
    <time>${parsedObject.release_date}</time>
    <h2>Characters</h2>
    <ul class="characters"></ul>
    `
    const main = document.querySelector("main")
    main.append(div)

}