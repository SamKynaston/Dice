//Dice Elements
const dice = [
    "./images/one.png",
    "./images/two.png",
    "./images/three.png",
    "./images/four.png",
    "./images/five.png",
    "./images/six.png",
]

let lastRoll = 0

//Elements

//Player One
let currentlyPlayingPlr1 = true
let scorePlr1 = 0
let holdScorePlr1 = 0
let lostPlr1 = false
let wonPlr1 = false

//Player Two
let currentlyPlayingPlr2 = false
let scorePlr2 = 0
let holdScorePlr2 = 0
let lostPlr2 = false
let wonPlr2 = false

//Restart Function
function restart() {
    //Dice Image
    document.getElementById("diceElement").src = dice[0]

    //Currently Playing
    document.getElementById("plr-2").classList.remove("active")
    document.getElementById("plr-1").classList.add("active")
    currentlyPlayingPlr2 = false
    currentlyPlayingPlr1 = true

    //Player One
    scorePlr1 = 0
    holdScorePlr1 = 0
    lostPlr1 = false
    wonPlr1 = false
    document.getElementById("message-1").style = "display:none;"
    document.getElementById("resetBtn-1").style = "display:none;"
    document.getElementById("rollBtn-1").style = "display:block;"
    document.getElementById("holdBtn-2").style = "display:block;"
    document.getElementById("score-1").innerHTML = `${scorePlr1}`
    document.getElementById("holding-1").innerHTML = `${holdScorePlr1}`

    //Player Two
    scorePlr2 = 0
    holdScorePlr2 = 0
    lostPlr2 = false
    wonPlr2 = false
    document.getElementById("message-2").style = "display:none;"
    document.getElementById("resetBtn-2").style = "display:none;"
    document.getElementById("rollBtn-2").style = "display:block;"
    document.getElementById("holdBtn-2").style = "display:block;"
    document.getElementById("score-2").innerHTML = `${scorePlr2}`
    document.getElementById("holding-2").innerHTML = `${holdScorePlr2}`
}

function message() {
    if (wonPlr1 || wonPlr2 || lostPlr1 || lostPlr2) {
        //Player One
        document.getElementById("message-1").style = "display:block;"
        document.getElementById("resetBtn-1").style = "display:block;"
        document.getElementById("rollBtn-1").style = "display:none;"
        document.getElementById("holdBtn-1").style = "display:none;"

        //Player Two
        document.getElementById("message-2").style = "display:block;"
        document.getElementById("resetBtn-2").style = "display:block;"
        document.getElementById("rollBtn-2").style = "display:none;"
        document.getElementById("holdBtn-2").style = "display:none;"

        if (wonPlr1 || lostPlr2) {
            document.getElementById("message-1").innerHTML = "You Won!"
            document.getElementById("message-2").innerHTML = "You Lost!"
        } else {
            document.getElementById("message-1").innerHTML = "You Lost!"
            document.getElementById("message-2").innerHTML = "You Won!"
        }
    }
}

//Role Function
function roll(btn) {
    if (btn == 1 && currentlyPlayingPlr1 || btn == 2 && currentlyPlayingPlr2) {
        let x
        let y

        while (true) {
            x = Math.trunc(Math.random() * dice.length)
            y = x + 1;

            if (lastRoll != x) {
                lastRoll = x
                document.getElementById("diceElement").src = dice[x]
                
                break;
            }
        }

        if (currentlyPlayingPlr1) {
            scorePlr1 += y
            document.getElementById("score-1").innerHTML = `${scorePlr1}`
            
            if (y === 1) {
                lostPlr1 = true
                return message()
            } 
        } else {
            scorePlr2 += y
            document.getElementById("score-2").innerHTML = `${scorePlr2}`
        
            if (y === 1) {
                lostPlr2 = true
                return message()
            } 
        }
    }
}

//Hold Function
function hold(btn) {
    if (btn == 1 && currentlyPlayingPlr1 || btn == 2 && currentlyPlayingPlr2) {
        if (currentlyPlayingPlr1) {
            holdScorePlr1 += scorePlr1
            scorePlr1 = 0
            document.getElementById("score-1").innerHTML = `${scorePlr1}`
            document.getElementById("holding-1").innerHTML = `${holdScorePlr1}`

            //Set the new player
            document.getElementById("plr-2").classList.add("active")
            document.getElementById("plr-1").classList.remove("active")
            currentlyPlayingPlr2 = true
            currentlyPlayingPlr1 = false

            if (holdScorePlr1 > 20) {
                wonPlr1 = true
                return message()
            }
        } else {
            holdScorePlr2 += scorePlr2
            scorePlr2 = 0
            document.getElementById("score-2").innerHTML = `${scorePlr2}`
            document.getElementById("holding-2").innerHTML = `${holdScorePlr2}`

            //Set the new player
            document.getElementById("plr-2").classList.remove("active")
            document.getElementById("plr-1").classList.add("active")
            currentlyPlayingPlr2 = false
            currentlyPlayingPlr1 = true

            if (holdScorePlr2 > 20) {
                wonPlr2 = true
                return message()
            }
        }
    }
}