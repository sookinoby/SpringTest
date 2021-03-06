'use strict';
/* Memory Game Models and Business Logic */

function Tile(title) {
  this.title = title;
  this.flipped = false;
}

Tile.prototype.flip = function() {
  this.flipped = !this.flipped;
}



function Game(tileNames) {
  this.tileDeck = makeDeck(tileNames);
 
  this.titleNamesList = tileNames;
 
  this.grid = makeGrid(this.tileDeck);
  this.message = Game.MESSAGE_CLICK;
  this.unmatchedPairs = tileNames.length;
  this.agent1 = 0;
  this.agent2 = 0;
  this.human = 0;
  this.flipTile = function(tile,agentName) {
   
    // when flipTitle recieves undefined value, it means we need to rotate firstPick and secondPick back to normal way 
    if(tile == null)
    {
      
          console.log(this.firstPick);
          console.log(this.secondPick);
         if (this.firstPick && this.secondPick) {
           this.firstPick.flip();
           this.secondPick.flip();
           this.firstPick = this.secondPick = undefined;
           return;
         }
         return;
    }

     if (tile.flipped) {
      return;
    }
     tile.flip();
     console.log(tile);
    if (!this.firstPick) {



      this.firstPick = tile;
     // console.log(this.firstPick);
      this.message = Game.MESSAGE_ONE_MORE;

    } else {

      if (this.firstPick.title === tile.title) {
        if(agentName.toLowerCase() == "bob")
        {
          this.agent1++;
        }
        else if(agentName.toLowerCase() == "fred" ) {
          this.agent2++;
        }
        else {
          this.human++;
        }

        this.unmatchedPairs--;
        this.message = (this.unmatchedPairs > 0) ? Game.MESSAGE_MATCH : Game.MESSAGE_WON;
        this.firstPick = this.secondPick = undefined;
      } else {
        this.secondPick = tile;
        this.message = Game.MESSAGE_MISS;
      }
    }
  }
}

Game.MESSAGE_CLICK = 'Click on a tile.';
Game.MESSAGE_ONE_MORE = 'Pick one more card.'
Game.MESSAGE_MISS = 'Try again.';
Game.MESSAGE_MATCH = 'Good job! Keep going.';
Game.MESSAGE_WON = 'You win!';



/* Create an array with two of each tileName in it */
function makeDeck(tileNames) {
  var tileDeck = [];
  tileNames.forEach(function(name) {
    tileDeck.push(new Tile(name));
  });

  return tileDeck;
}

function makeDeck2(tileNames) {
  var tileDeck = [];
  var i =0;
    tileNames.forEach(function(name) {
    tileDeck.push(new Tile(name));
  });

  return tileDeck;
}


function makeGrid(tileDeck) {
  var gridDimension = Math.sqrt(tileDeck.length),
      grid = [];

  for (var row = 0; row < gridDimension; row++) {
    grid[row] = [];
    for (var col = 0; col < gridDimension; col++) {
        grid[row][col] = removeorderedTitle(tileDeck);
    }
  }

  return grid;
}


function removeRandomTile(tileDeck) {
  var i = Math.floor(Math.random()*tileDeck.length);
  return tileDeck.splice(i, 1)[0];
}
var q = 0 ;
function removeorderedTitle(tileDeck) {
  
  return tileDeck[q++];
}

