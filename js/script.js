
window.onload = function(){
  new Game().start();

};


function Game() {
  this.boxes = document.getElementsByTagName("td");
  this.turnText = document.querySelector(".playerTurn");
  this.counter = 0;
  this.winCounter = 0;
  this.OMoves = [];
  this.XMoves = [];
  this.winningCombinations= [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  this.XWinsCounter = 0;
  this.OWinsCounter = 0;
}

Game.prototype.start = function(){
    this.addXandOListener();
    this.addResetListener();
    this.XName = prompt('What\'s your name?');
    this.OName = prompt('What\'s your name?');
    document.getElementById("XWins").innerHTML = this.XName + "- ilość wygranych: " + this.XWinsCounter;
    document.getElementById("OWins").innerHTML = this.OName + "- ilość wygranych: " + this.OWinsCounter;


};

Game.prototype.addXandOListener = function(){
  for (var i = this.boxes.length - 1; i >= 0; i--) {
    this.boxes[i].addEventListener("click", this.addXorO.bind(this));
  }
};

Game.prototype.addXorO = function(event){

    if(event.target.innerHTML.length === 0) {
      if(this.counter % 2 === 0) {
        this.OMoves.push(parseInt(event.target.getAttribute("data-num")));
        event.target.innerHTML = "O";
        event.target.setAttribute("class","O");
        this.turnText.innerHTML = this.XName +"'s turn";
        this.counter++;
          if(this.checkForWin(this.OMoves, this.OName)) {
            this.OWinsCounter++;
            document.getElementById("OWins").innerHTML = this.OName + " - ilość wygranych: " + this.OWinsCounter;
        }
      }
      else {
        this.XMoves.push(parseInt(event.target.getAttribute("data-num")));
        event.target.innerHTML = "X";
        event.target.setAttribute("class","X");
        this.turnText.innerHTML = this.OName + "'s turn";
        this.counter++;
          if(this.checkForWin(this.XMoves, this.XName)) {
            this.XWinsCounter++;
            document.getElementById("XWins").innerHTML =  this.XName + " - ilość wygranych: " + this.XWinsCounter;
        }
      }

    if(this.counter == 9 && !this.win) {
      this.turnText.innerHTML = "Game Over!";
      var conf = confirm("It's a draw, play again?");
      if(conf){
          var resetBoard = this.resetBoard.bind(this);
          resetBoard();
      }
    }
  }
};

Game.prototype.addResetListener = function(){
  var resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", this.resetBoard.bind(this));
};

 Game.prototype.checkForWin = function(movesArray, name){
  for (i = 0; i < this.winningCombinations.length; i++) {
    winCounter = 0;
    for (var j = 0; j < this.winningCombinations[i].length; j++) {
      if(movesArray.indexOf(this.winningCombinations[i][j]) !== -1){
        winCounter++;
      }
      if(winCounter === 3){
        var resetBoard = this.resetBoard.bind(this);
        this.win = true;
        setTimeout(function()  {
            alert("Game over, " + name + " wins!");
            resetBoard();
        }, 50);
      }
    }
  }
};




 Game.prototype.resetBoard = function(){
  for (var i = this.boxes.length - 1; i >= 0; i--) {
    this.boxes[i].innerHTML="";
    this.boxes[i].setAttribute("class","clear");
  }
    this.OMoves = [];
    this.XMoves = [];
    this.winCounter = 0;
    this.counter = 0;
    this.win = false;
    this.turnText.innerHTML = "It is " + this.XName + "'s turn";
 };
