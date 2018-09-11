/* rules:
1. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
2. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
*/

var scores, roundScore, activePlayer, gamePlaying;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
  // 1. GENERATE THE RANDOM NO
  var dice1 = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;

  //2. DISPLAY RESULT
  document.getElementById('dice-1').style.display = 'block';
  document.getElementById('dice-2').style.display = 'block';
  document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
  document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

  //3. UPDATE ROUND SCORE IF DICE NOT EQUAL1
  if (dice1 !== 1 && dice2 !== 1) {
    //Add score
    roundScore += dice1 + dice2;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
   else {
        nextPlayer();
        }

    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
  // ADD ROUND SCORE TO FINAL SCORES
  scores[activePlayer] += roundScore;

  // UPDATE UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  //SETTING UP THE WINNING SCORE
  var input = document.querySelector('.final-score').value;
  var winningScore;

  if(input) {
      winningScore = input;
  } else {
    winningScore = 100;
        }

  // CHECK IF WON THE GAME
  if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
        }
      else {
            nextPlayer();
        }
    }
});


function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
