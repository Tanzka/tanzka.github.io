const moneyText = document.getElementById("money");
const infoText = document.getElementById("info-text");
const betText = document.getElementById("bet-text");
const playButton = document.getElementById("play");
const betButtons = document.querySelectorAll("#bet-button");
playButton.addEventListener("click", play);

const slots = [
    {img: document.getElementById("slot1"), lockButton: document.getElementById("lock1"), result: 0, locked: false},
    {img: document.getElementById("slot2"), lockButton: document.getElementById("lock2"), result: 0, locked: false},
    {img: document.getElementById("slot3"), lockButton: document.getElementById("lock3"), result: 0, locked: false},
    {img: document.getElementById("slot4"), lockButton: document.getElementById("lock4"), result: 0, locked: false}
];

const images = [
    "img/cherry.png", "img/grape.png", "img/melon.png", "img/apple.png", "img/seven.png"
];

let money = 25;
let currentBet = 1;
let hasReroll = true;
init()

function init() {
    for (const i in slots) {
        slots[i].lockButton.addEventListener("click", function() {toggleLock(i)});
    }
    betButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (hasReroll) {
                currentBet = parseInt(this.getAttribute("data-amount"));
                updateBetText();
            }
        });
    });
    updateBetText();
    updateMoneyText();
}

function play() {
    infoText.setAttribute("class", "hidden");

    if (money < currentBet && hasReroll) {
        infoText.innerText = "Rahat eivät riitä!";
        infoText.setAttribute("class", "info-alert");
        return;
    }

    if (hasReroll) {
        money -= currentBet;
    }

    rollSlots();
    let reward = checkRewards();
    
    if (reward > 0) {
        money += reward;
        infoText.innerText = `Voitit ${reward} euroa!`
        infoText.setAttribute("class", "info-win");
    }

    if (reward == 0 && hasReroll) {
        hasReroll = false;
        enableLocks();
        disableBet();
        infoText.innerText = `Ei vielä voittoa. Voit nyt lukita.`;
        infoText.setAttribute("class", "info-alert");
    }
    else {
        hasReroll = true;
        disableLocks();
        enableBet();
    }

    updateMoneyText();
}

function rollSlots() {
    for (const i in slots) {
        const slot = slots[i];
        if (!hasReroll && slot.locked) {
            continue;
        }
        let result = Math.floor(Math.random() * images.length);
        slot.result = result;
        slot.img.setAttribute("src", images[result]);
    }
}

function enableLocks() {
    for (const i in slots) {
        const slot = slots[i];
        slot.lockButton.setAttribute("class", "button");
    }
}

function disableLocks() {
    for (const i in slots) {
        const slot = slots[i];
        slot.lockButton.setAttribute("class", "button-disabled");
        slot.locked = false;
    }
}

function toggleLock(slotNumber) {
    if (!hasReroll) {
        const slot = slots[slotNumber];
        slot.locked = !slot.locked;
        if (slot.locked) {
            slot.lockButton.setAttribute("class", "button-locked");
        }
        else {
            slot.lockButton.setAttribute("class", "button");
        }
    }
}

function enableBet() {
    betButtons.forEach(button => {
        button.setAttribute("class", "button");
    });
}

function disableBet() {
    betButtons.forEach(button => {
        button.setAttribute("class", "button-disabled");
    });
}

function updateBetText() {
    betText.innerText = `Panos: ${currentBet}€`;
}

function updateMoneyText() {
    moneyText.innerText = `${money}€`;
}

function checkRewards() {
    const cherryValue = 3;
    const grapeValue = 4;
    const melonValue = 5;
    const appleValue = 6;
    const tripleSevenValue = 5;
    const quadSevenValue = 10;

    let cherries = 0;
    let grapes = 0;
    let melons = 0;
    let apples = 0;
    let sevens = 0;

    for (const i in slots) {
        const slot = slots[i];

        switch (slot.result) {
            case 0:
                cherries++;
                break;
            case 1:
                grapes++;
                break;
            case 2:
                melons++;
                break;
            case 3:
                apples++;
                break;
            case 4:
                sevens++;
        }
    }

    let reward = 0;

    if (cherries == 4) {
        reward = cherryValue;
    }

    if (grapes == 4) {
        reward = grapeValue;
    }

    if (melons == 4) {
        reward = melonValue;
    }

    if (apples == 4) {
        reward = appleValue;
    }
    
    if (sevens == 3) {
        reward = tripleSevenValue;
    }
    
    if (sevens == 4) {
        reward = quadSevenValue;
    }

    return reward * currentBet;
}