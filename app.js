'use strict';

// Pull Storage and Push storage functions are probably you data problems
Player.all = [];
var startGame = document.getElementById('start_game');

function updatePlayerArray(playerOneOrTwo) {
  for (var i = 0; i < Player.all.length; i++) {
    if (playerOneOrTwo.name === Player.all[i].name) {
      console.log('Found player to update');
      Player.all[i] = playerOneOrTwo;
    }
  }
}

function go(event) {
  if (localStorage.length > 0) {
    pullStorage();
  }
  Player.playerOne = initiatePlayers(1);
  Player.playerTwo = initiatePlayers(2);

  // Start the game execution
  game.p1.score = 0;
  game.p2.score = 0;
  MainLoop();
  // endResults();
  // updatePlayerArray(Player.playerOne);
  // updatePlayerArray(Player.playerTwo);
  // pushStorage();
}

  // return new Player(value);
//
function endResults() {
  console.log('this score of p1 is' + game.p1.score);
  console.log('this score of p2 is' + game.p2.score);
  Player.playerOne.totalMatches++;
  Player.playerTwo.totalMatches++;
  if(game.p1.score > game.p2.score) {
    console.log('P1 score is > p2 score');
    Player.playerOne.wins++;
    Player.playerTwo.losses++;
  } else {
    Player.playerTwo.wins++;
    Player.playerOne.losses++;
  }
  Player.playerOne.winRatio = (Player.playerOne.wins / Player.playerOne.totalMatches);
  Player.playerTwo.winRatio = (Player.playerTwo.wins / Player.playerTwo.totalMatches);
}

function pullStorage() {
  var storeAll = localStorage.getItem('all');
  Player.all = JSON.parse(storeAll);
}

function checkPlayers(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (value === array[i].name) {
      console.log('Found match');
      alert('Welcome back ' + value + '.');
      return array[i];
    }
  }
  return new Player(value);
}

function initiatePlayers(a) {
  var playerInit;
  var playerMatch = prompt('Enter Player ' + a + '.');
  if (Player.all.length > 0) {
    playerInit = checkPlayers(Player.all, playerMatch);
    console.log('I found a existing player ' + playerInit.name + ' and local storage exists!');
  } else {
    playerInit = new Player(playerMatch);
    console.log('No local storage. Created a new player.');
  }
  return playerInit;
}

// returning player true/false
function Player(name) {
  this.name = name;
  this.wins = 0;
  this.losses = 0;
  this.totalMatches = 0;
  // this.returning = false;
  this.winRatio = 0;
  this.match = [];
  this.nemesis = [];
  Player.all.push(this);
}

function pushStorage() {
  console.log('push');
  var storeAll = JSON.stringify(Player.all);
  localStorage.setItem('all', storeAll);
  if (localStorage.all) {
    Player.all = storeAll;
  }
}

startGame.addEventListener('click', go);
