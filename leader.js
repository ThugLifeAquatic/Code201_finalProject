'use strict';

Player.all = [];
Player.header = ['Names', 'Wins', 'Losses', 'Total Matches', 'Kill/Death Ratio', 'Nemesis'];
Player.leaderBoardTable = document.getElementById('leaderBoardHTML');

function Player (name){
  this.name = name;
  this.wins = 0;
  this.losses = 0;
  this.totalMatches = 0;
  this.returning = false;
  this.winRatio = (this.wins / this.totalMatches);
  this.match = [];
  this.nemesis = [];
  Player.all.push(this);
}

function pullStorage() {
  console.log('pulled local storage');
  var storeAll = localStorage.getItem('all');
  Player.all = JSON.parse(storeAll);
}

function header() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  for (var i = 0; i < Player.header.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = Player.header[i];
    trEl.appendChild(thEl);
    Player.leaderBoardTable.appendChild(trEl);
  }
}

function render () {
  for (var i = 0; i < Player.all.length; i++) {
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = Player.all[i].name;
    trEl.appendChild(tdEl);
    Player.leaderBoardTable.appendChild(trEl);

    var tdElTwo = document.createElement('td');
    tdElTwo.textContent = Player.all[i].wins;
    trEl.appendChild(tdElTwo);

    var tdElThree = document.createElement('td');
    tdElThree.textContent = Player.all[i].losses;
    trEl.appendChild(tdElThree);

    var tdElFour = document.createElement('td');
    tdElFour.textContent = Player.all[i].totalMatches;
    trEl.appendChild(tdElFour);

    var tdElFive = document.createElement('td');
    tdElFive.textContent = Player.all[i].winRatio;
    trEl.appendChild(tdElFive);

    var tdElSix = document.createElement('td');
    tdElFive.textContent = Player.all[i].nemesis;
    trEl.appendChild(tdElSix);

    Player.leaderBoardTable.appendChild(trEl);
  }
}

header();

pullStorage();
render();
