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

function isKill (str) {
    return str.toLowerCase().indexOf('kill') > -1
}

function isSeparator (str) {
    return str.toLowerCase().indexOf('-----') > -1
}

function getLoser (arr) {
    return arr.slice(arr.indexOf('killed') + 1, arr.indexOf('by')).join(' ')
}

function getWinner (arr) {
    
    return arr.slice(arr.indexOf('Kill:') + 4, arr.indexOf('killed')).join(' ')
}

function parseGame(logs) {

    const logsArr = logs.split("\n")
    const length = logsArr.length
    let initiated = false
    console.log('logs length', logsArr.length)
    // iterate rows
    for (let i = 0; i < length; i++) {
        const row = logsArr[i]

        if (isSeparator(row)) {
            if (initiated) {
                const log = {
                    [`game_${gameId}`]: {
                        total_kills: totalKills,
                        players: Array.from(players),
                        kills,
                    }
                }
                
                result.push(log)
                init()
            }
            initiated = !initiated
        } else if (isKill(row)) {
            totalKills ++;
            const cols = row.split(' ')
            const winner = getWinner(cols)
            const loser = getLoser(cols)

            players.add(winner)
            players.add(loser)

            if (winner.indexOf('<world>') > -1) {
                if (kills[loser]) kills[loser]--;
                else kills[loser] = -1
            } else {
                if (kills[winner]) kills[winner] ++
                else kills[winner] = 1
            }
        }
    }
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

main()