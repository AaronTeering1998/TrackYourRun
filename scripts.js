let goal = 25;
let entries = [];
const entriesWrapper = document.getElementById("entries"); 
document.querySelector('#target').innerText = goal;

function addNewEntry(newEntry) {
    entriesWrapper.removeChild(entriesWrapper.firstElementChild);
    const listItem = document.createElement("li");
    const listValue = document.createTextNode(newEntry);
    listItem.appendChild(listValue);
    entriesWrapper.appendChild(listItem);
}

function reducer(total, currentValue) {
    return total + currentValue;
}

function calcTotal() {
    const totalValue = entries.reduce(reducer).toFixed(2);
    document.getElementById('total').innerText = totalValue;
    document.getElementById('progressTotal').innerText = totalValue;
}

function calcAverage() {
    const average = (entries.reduce(reducer) / entries.length).toFixed(2);
    document.getElementById('average').innerText = average;
}

function weeklyHigh() {
    const high = Math.max(...entries);
    document.getElementById('high').innerText = high;
}

function calcGoal() {
    const totalValue = entries.reduce(reducer).toFixed(2);
    const completedPercent = totalValue / (goal / 100);
    const progressCircle = document.querySelector('#progressCircle');
    if(completedPercent > 100) completedPercent === 100;
    progressCircle.style.background = `conic-gradient(#70db70 ${completedPercent}%, #4E5166 ${completedPercent}% 100%)`;
}

function handleChange(event) {
    event.preventDefault();
    
    goal = Number(document.querySelector("#changeTarget").value);
    document.querySelector('#target').innerText = goal;
    calcGoal();
}

function handle(event) {
    event.preventDefault();
    const entry = Number(document.querySelector("#entry").value);
    if(!entry) return;
    document.querySelector("form").reset();
    entries.push(entry);
    addNewEntry(entry);
    calcTotal();
    calcAverage();
    weeklyHigh();
    calcGoal();
}

const form = document
    .querySelector("form")
    .addEventListener("submit", handle);

const changeTarget = document
    .querySelector("form#changeForm")
    .addEventListener("submit", handleChange)