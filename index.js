import fs from 'fs'

let result = []

let gameId = 1
let totalKills = 0
let players = new Set()
let kills = {}

function init () {
    totalKills = 0;
    players = new Set()
    kills = {}

    gameId++
}

function parseGame(logs) {

    console.log(logs)
}
function main() {
    fs.readFile('./qgames.log', 'utf8', (err, data) => {
        if (err) {

            console.error(err)
            return
        }

        // console.log(data)
        parseGame(data)
        console.log(JSON.stringify(result))
    })

}