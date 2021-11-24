
//Sockets section for group chat

let socket = io( 'http://localhost:8888' );
let username;
socket.on('prompt',function(){
    username = prompt('Please enter your name');
    socket.emit('username',{username:username});
    
})


//Game variables- I'll have these as global variables to facilitate further development

let myGame = {pacmanCurrentIndex:490, squares:[], score:0}


$( '.messageForm' ).on( 'submit', function(event){
    event.preventDefault();

    let userMessage = $( '#userMessage' ).val();

    let send = {
        name: username,
        message: userMessage
    };

    socket.emit( 'sendMessage', send );
});

socket.on( 'sendAll', function( data ){
    let newMessage = `<p> ${data.name}: ${data.message} </p>`;
    $( '.messageBox' ).append( newMessage );
});

socket.on('allMessages', function(data){
    for(let i=0; i<data.messages.length; i++){
        msg = data.messages[i]
        let newMessage = `<p> ${msg.name}: ${msg.message} </p>`;
        $( '.messageBox' ).append( newMessage );

    }


}
)




//Please note that I took this Pacman code from Github
// and did some minor modifications to improve it
// the sockets section is my own creation


  const scoreDisplay = document.getElementById('score')
  const width = 28
  const grid = document.querySelector('.grid')
  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]

  let layout_copy = layout;
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty


  //create your board
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      myGame.squares.push(square)

      //add layout to the board
      if(layout[i] === 0) {
        myGame.squares[i].classList.add('pac-dot')
      } else if (layout[i] === 1) {
        myGame.squares[i].classList.add('wall')
      } else if (layout[i] === 2) {
        myGame.squares[i].classList.add('ghost-lair')
      } else if (layout[i] === 3) {
        myGame.squares[i].classList.add('power-pellet')
      }
    }
  }
  createBoard()


  //create Characters
  //draw pacman onto the board

  myGame.squares[myGame.pacmanCurrentIndex].classList.add('pac-man')
  //get the coordinates of pacman on the grid with X and Y axis
  function getCoordinates(index) {
    return [index % width, Math.floor(index / width)]
  }

  // console.log(getCoordinates(myGame.pacmanCurrentIndex))

  //move pacman
  function movePacman(e) {
    myGame.squares[myGame.pacmanCurrentIndex].classList.remove('pac-man')
    switch(e.keyCode) {
      case 37:
        if(
          myGame.pacmanCurrentIndex % width !== 0 &&
          !myGame.squares[myGame.pacmanCurrentIndex -1].classList.contains('wall') &&
          !myGame.squares[myGame.pacmanCurrentIndex -1].classList.contains('ghost-lair')
          )
        myGame.pacmanCurrentIndex -= 1
        if (myGame.squares[myGame.pacmanCurrentIndex -1] === myGame.squares[363]) {
          myGame.pacmanCurrentIndex = 391
        }
        break
      case 38:
        if(
          myGame.pacmanCurrentIndex - width >= 0 &&
          !myGame.squares[myGame.pacmanCurrentIndex -width].classList.contains('wall') &&
          !myGame.squares[myGame.pacmanCurrentIndex -width].classList.contains('ghost-lair')
          ) 
        myGame.pacmanCurrentIndex -= width
        break
      case 39:
        if(
          myGame.pacmanCurrentIndex % width < width - 1 &&
          !myGame.squares[myGame.pacmanCurrentIndex +1].classList.contains('wall') &&
          !myGame.squares[myGame.pacmanCurrentIndex +1].classList.contains('ghost-lair')
        )
        myGame.pacmanCurrentIndex += 1
        if (myGame.squares[myGame.pacmanCurrentIndex +1] === myGame.squares[392]) {
          myGame.pacmanCurrentIndex = 364
        }
        break
      case 40:
        if (
          myGame.pacmanCurrentIndex + width < width * width &&
          !myGame.squares[myGame.pacmanCurrentIndex +width].classList.contains('wall') &&
          !myGame.squares[myGame.pacmanCurrentIndex +width].classList.contains('ghost-lair')
        )
        myGame.pacmanCurrentIndex += width
        break
    }
    myGame.squares[myGame.pacmanCurrentIndex].classList.add('pac-man')
    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
    sendGame()
  }
  document.addEventListener('keyup', movePacman)

  // what happens when you eat a pac-dot
  function pacDotEaten() {
    if (myGame.squares[myGame.pacmanCurrentIndex].classList.contains('pac-dot')) {
      myGame.score++
      scoreDisplay.innerHTML = myGame.score
      myGame.squares[myGame.pacmanCurrentIndex].classList.remove('pac-dot')
      layout_copy[myGame.pacmanCurrentIndex]= 4
    }
  }

  //what happens when you eat a power-pellet
  function powerPelletEaten() {
    if (myGame.squares[myGame.pacmanCurrentIndex].classList.contains('power-pellet')) {
      myGame.score +=10
      myGame.ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(unScareGhosts, 10000)
      myGame.squares[myGame.pacmanCurrentIndex].classList.remove('power-pellet')
      layout_copy[myGame.pacmanCurrentIndex]=4
    }
  }

  //make the ghosts stop flashing
  function unScareGhosts() {
    myGame.ghosts.forEach(ghost => ghost.isScared = false)
  }

  //create ghosts using Constructors
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerId = NaN
    }
  }

  //all my ghosts
 myGame.ghosts = [
    new Ghost('blinky', 348, 200),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
    ]

  //draw my ghosts onto the grid
  myGame.ghosts.forEach(ghost => {
    myGame.squares[ghost.currentIndex].classList.add(ghost.className)
    myGame.squares[ghost.currentIndex].classList.add('ghost')
    })

  //move the Ghosts randomly
  myGame.ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost) {
    const directions =  [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
      const [ghostX, ghostY] = getCoordinates(ghost.currentIndex)
      const [pacManX, pacManY] = getCoordinates(myGame.pacmanCurrentIndex)
      const [ghostNextX, ghostNextY] = getCoordinates(ghost.currentIndex + direction)

      function isCloser() {
        if ((ghostNextX - pacManX)^2 + (ghostNextY - pacManY)^2 < (ghostX - pacManX)^2 + (ghostY - pacManY)^2){
          return true
        } else return false
     }



      //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
      if  (!myGame.squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !myGame.squares[ghost.currentIndex + direction].classList.contains('wall') && isCloser() ) {
          //remove the ghosts classes
          myGame.squares[ghost.currentIndex].classList.remove(ghost.className)
          myGame.squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
          //move into that space
          ghost.currentIndex += direction
          myGame.squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      //else find a new random direction ot go in
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      //if the ghost is currently scared
      if (ghost.isScared) {
        myGame.squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      //if the ghost is currently scared and pacman is on it
      if(ghost.isScared && myGame.squares[ghost.currentIndex].classList.contains('pac-man')) {
        myGame.squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        myGame.score +=100
        myGame.squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }
    checkForGameOver()
    }, ghost.speed)
  }

  //check for a game over
  function checkForGameOver() {
    if (myGame.squares[myGame.pacmanCurrentIndex].classList.contains('ghost') &&
      !myGame.squares[myGame.pacmanCurrentIndex].classList.contains('scared-ghost')) {
      myGame.ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("Game Over"); }, 500)
    }
  }

  //check for a win - more is when this score is reached
  function checkForWin() {
    if (myGame.score === 274) {
      myGame.ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("You have WON!"); }, 500)
    }
  }



//Sockets section for multiplayer view





function sendGame(){
  game = {
  username: username,
  pacmanCurrentIndex: myGame.pacmanCurrentIndex,
  blinky:myGame.ghosts[0].currentIndex,
  pinky:myGame.ghosts[1].currentIndex,
  inky:myGame.ghosts[2].currentIndex,
  clyde:myGame.ghosts[3].currentIndex,
score: myGame.score,
layout:layout_copy}
  socket.emit( 'userGame', {game:game} );
}

socket.on('userGame',updateGame)

function createBoardSec() {
  for (let i = 0; i < layout.length; i++) {
    let square = document.createElement('div')
    grid.appendChild(square)
    myGame.squares.push(square)

    //add layout to the board
    if(layout[i] === 0) {
      myGame.squares[i].classList.add('pac-dot')
    } else if (layout[i] === 1) {
      myGame.squares[i].classList.add('wall')
    } else if (layout[i] === 2) {
      myGame.squares[i].classList.add('ghost-lair')
    } else if (layout[i] === 3) {
      myGame.squares[i].classList.add('power-pellet')
    }
  }
}

function updateGame(data){
  console.log(data.game.game);
  if($(`#${data.game.game.username}`).length ==0){
    $('.otherUsers').append(`<div id=${data.game.game.username}> 
    <p>${data.game.game.username}'s game</p>
    <p">Score:<span id="score${data.game.game.username}">${data.game.game.score}</span></p>
    <div class="grid-sec">
    
    </div>
    </div>`)
  }
  $(`#score${data.game.game.username}`).text(data.game.game.score)

  let grid = $(`#${data.game.game.username} .grid-sec`)
  $(grid).empty();
  
  for (let i = 0; i < data.game.game.layout.length; i++) {
    let square = document.createElement('div')
    
    
    //add layout to the board
    if(data.game.game.layout[i] === 0) {
      square.classList.add('pac-dot-sec')
    } else if (data.game.game.layout[i] === 1) {
      square.classList.add('wall')
    } else if (data.game.game.layout[i] === 2) {
      square.classList.add('ghost-lair')
    } else if (data.game.game.layout[i] === 3) {
      square.classList.add('power-pellet-sec')
    }
    if(data.game.game.pacmanCurrentIndex == i){
      square.classList.add('pac-man-sec')
    }
    else if(data.game.game.pinky == i){
      square.classList.add('pinky')
    }
    else if(data.game.game.inky == i){
      square.classList.add('inky')
    }
    else if(data.game.game.blinky == i){
      square.classList.add('blinky')
    }
    else if(data.game.game.clyde == i){
      square.classList.add('clyde')
    }


    $(grid).append(square)
  }


}
