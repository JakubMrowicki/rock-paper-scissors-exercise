const hands = ['rock', 'paper', 'scissors']

const getComputerChoice = () => {
  const rand = Math.floor(Math.random() * 3)
  return hands[rand]
}

const playRound = (player, computer) => {
  if (player === computer) {
    console.log(`It's a draw! You both chose ${player}`)
    return 0
  }
  if (player === 'rock' && computer === 'paper') {
    console.log(`You lose! Paper beats your rock.`)
    return 2
  }
  if (player === 'paper' && computer === 'scissors') {
    console.log(`You lose! Scissors beats your paper.`)
    return 2
  }
  if (player === 'scissors' && computer === 'rock') {
    console.log(`You lose! Rock beats your scissors.`)
    return 2
  }
  console.log(`You win! Your ${player} beats ${computer}`)
  return 1
}

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

console.log(playGame(5))
