const playGame = (rounds) => {
  let score = [0, 0]
  for (let i = 0; i < rounds; i++) {
    let input = prompt('Select(rock, paper or scissors)')
    let result = playRound(input, getComputerChoice())
    if (result === 1) {
      score[0]++
    } else if (result === 2) {
      score[1]++
    }
    if (rounds - i === 1 && score[0] === score[1]) {
      console.log('Tie breaker, play one more!')
      i--
    }
  }
  console.log(`Final score: ${score}`)
}

const rps = {
  element: {
    reset: document.querySelector('#reset-btn'),
    playerScore: document.querySelector('#playerScore'),
    opponentScore: document.querySelector('#opponentScore'),
    roundNumber: document.querySelector('#roundNumber'),
  },
  var: {
    hands: ['rock', 'paper', 'scissors'],
    score: {
      player: 0,
      opponent: 0,
    },
    roundNumber: 1,
  },
  task: {
    sendMove: (player, computer) => {
      if (player === computer) {
        console.log(`It's a draw! You both chose ${player}`)
      } else if (player === 'rock' && computer === 'paper') {
        rps.var.score.opponent++
        rps.element.opponentScore.textContent = `${rps.var.score.opponent}`
        console.log(`You lose! Paper beats your rock.`)
      } else if (player === 'paper' && computer === 'scissors') {
        rps.var.score.opponent++
        rps.element.opponentScore.textContent = `${rps.var.score.opponent}`
      } else if (player === 'scissors' && computer === 'rock') {
        rps.var.score.opponent++
        rps.element.opponentScore.textContent = `${rps.var.score.opponent}`
        console.log(`You lose! Rock beats your scissors.`)
      } else {
        rps.var.score.player++
        rps.element.playerScore.textContent = `${rps.var.score.player}`
        console.log(`You win! Your ${player} beats ${computer}`)
      }
    },
    getComputerChoice: () => {
      const rand = Math.floor(Math.random() * 3)
      return rps.var.hands[rand]
    },
    updateRoundNumber: () => {
      if (rps.var.roundNumber > 5) {
        rps.element.roundNumber.textContent = `${rps.var.roundNumber} (Overtime)`
      } else {
        rps.element.roundNumber.textContent = `${rps.var.roundNumber}`
      }
    },
    endGame: () => {
      if (rps.var.roundNumber >= 5) {
        if (rps.var.score.player === rps.var.score.opponent) {
          console.log('Tiebreaker')
          return
        }
        if (rps.var.score.player > rps.var.score.opponent) {
          alert('You win!')
        } else {
          alert('You lost!')
        }
        rps.task.reset()
      }
    },
    reset: () => {
      rps.var.score.player = 0
      rps.var.score.opponent = 0
      rps.var.roundNumber = 1
      rps.element.opponentScore.textContent = `${rps.var.score.opponent}`
      rps.element.playerScore.textContent = `${rps.var.score.player}`
    },
    init: () => {
      const buttons = document.querySelectorAll('.controls button')
      rps.element.reset.addEventListener('click', () => {
        rps.task.reset()
      })
      buttons.forEach((button) => {
        rps.element[`${button.dataset.move}`] = button
        button.addEventListener('click', (e) => {
          const move = e.target.dataset.move
          rps.task.sendMove(move, rps.task.getComputerChoice())
          rps.var.roundNumber++
          rps.task.endGame()
          rps.task.updateRoundNumber()
          console.log(rps.var)
        })
      })
    },
  },
}

rps.task.init()
