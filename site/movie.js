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
console.log(newId)

fetch(`https://swapi.dev/api/films/${newId}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        console.log(parsedResponse)
    })