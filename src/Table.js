import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './components/Button.jsx'
import Cartes from "./views/Cartes";
import StartGame from './views/StartGame.jsx';
import { rndCarte, transformCardIntoInt } from "./utils/cardsUtils";

class Table extends React.Component {

  constructor() {
    super();

    this.state = {
      counterPlayer: 0,
      counterDealer: 0,
      playerCardList: [],
      dealerCardList: [],
      startGame: false,
      endGame: false,
      nameOfWinner: "",
      onStop: false,
      blackJack: false
    }
  }

  // Lorsque l'on appuie sur le bouton Stop ça génére les cartes du dealer,
  // et ça compare le jeu du dealer et du player,
  // ça met fin au jeu en annonçant le gagnant.
  onClickStop = () => {
    const cardSelectedDealer = rndCarte()
    const cardSelectedDealer2 = rndCarte()

    const valueCarteDealer = transformCardIntoInt(cardSelectedDealer.split("")[0])
    const valueCarteDealer2 = transformCardIntoInt(cardSelectedDealer2.split("")[0])

    const cardsDealer = [cardSelectedDealer, cardSelectedDealer2]

    let dealerValue = valueCarteDealer + valueCarteDealer2

    let endGameAndWinner = {
      endGame: false,
      nameOfWinner: ""
    }

    while (dealerValue < 17) {
      const cardSelectedDealer = rndCarte()
      const valueCarteDealer = transformCardIntoInt(cardSelectedDealer.split("")[0])

      cardsDealer.push(cardSelectedDealer)

      dealerValue += valueCarteDealer

      if (dealerValue > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Player"
        }

        break;
      }
    }
    if (dealerValue <= 21) {
      if (this.state.counterPlayer > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"
        }
      } else if (this.state.counterPlayer < dealerValue) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"
        }
      } else {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Player"
        }
      }
    }

    this.setState({
      counterDealer: dealerValue,
      dealerCardList: cardsDealer,
      nameOfWinner: endGameAndWinner.nameOfWinner,
      endGame: endGameAndWinner.endGame,
      onStop: true
    })
  }

  // Lorsque l'on appuie sur le boutton Give ça donne une carte au player
  onClickGive = () => {

    const cardSelected = rndCarte()
    const valueCarte = transformCardIntoInt(cardSelected.split("")[0])
    const totalPlayerValue = this.state.counterPlayer + valueCarte

    if (totalPlayerValue > 21) {
      this.setState({
        nameOfWinner: "Dealer",
        endGame: true,
        counterPlayer: totalPlayerValue,
        playerCardList: [...this.state.playerCardList, cardSelected]
      })
    } else {
      this.setState({
        counterPlayer: totalPlayerValue,
        playerCardList: [...this.state.playerCardList, cardSelected]
      })
    }
  }

  // Lorsque l'on appuie sur le boutton Start, cette méthode tire 2 cartes pour le player et lance le jeu.
  startGame = () => {
    const cardSelected = rndCarte()
    const cardSelected2 = rndCarte()

    const valueCarte = transformCardIntoInt(cardSelected.split("")[0])
    const valueCarte2 = transformCardIntoInt(cardSelected2.split("")[0])

    const firstPlayerValue = valueCarte + valueCarte2

    const firstTwoCardsPlayer = [cardSelected, cardSelected2]

    if (firstPlayerValue === 21) {
      this.setState({
        counterPlayer: firstPlayerValue,
        playerCardList: firstTwoCardsPlayer,
        startGame: true,
        endGame: true,
        blackJack: true
      })
    } else {
      this.setState({
        counterPlayer: firstPlayerValue,
        playerCardList: firstTwoCardsPlayer,
        startGame: true
      })
    }
  }

  // L'affichage lorsque le jeu démarre
  renderGame() {
    return (
      <div className="playGame">

        <h1>Black Jack</h1>

        <Cartes key={"dealer"} cardList={this.state.dealerCardList} />

        <div className="titleEndGame">
          { this.state.blackJack ? <div className='winlost'>
            <h1>You win with Black jack !!!</h1> </div> :  this.state.counterPlayer > 21 ? <div className='winlost'>
            <h1>You lose !</h1> </div> : this.state.endGame && (<div className='winlost'>
              <h1>Winner is {this.state.nameOfWinner}</h1>
            </div>)}
        </div>

        <Cartes key={"player"} cardList={this.state.playerCardList} />

        {this.state.onStop ? <div></div> : <div className=" divButton row col-6 offset-3 flex d-flex justify-content-between">

          <Button onClick={this.onClickGive} bcolor="#0d6efd"> Give </Button>
          <Button onClick={this.onClickStop} bcolor="#dc3545"> Stop </Button>
        </div>}
      </div>
    )
  }

  render() {
    // Le menu d'accueil du jeu
    if (this.state.startGame === false) {
      return (
        <StartGame startGame={this.startGame} />
      )
    } else {
      return (
        <>
          {this.renderGame()}
        </>
      )
    }
  }
}

export default Table;

