import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './components/Button.jsx'
import Cartes from "./views/Cartes";
import StartGame from './views/StartGame.jsx'

const cardArray = [
  "KS", "QS", "JS", "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "0S",
  "KD", "QD", "JD", "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "0D",
  "KH", "QH", "JH", "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "0H",
  "KC", "QC", "JC", "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "0C"];


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
      nameOfWinner: ""
    }
  }

  // Génére un index au hasard du tableau cardArray
  rndCarte() {
    let rndNumTemp = Math.floor(Math.random() * 52);

    let rndCarteTemp = cardArray[rndNumTemp];

    return rndCarteTemp
  }

  // Lorsque l'on appuie sur le bouton Stop ça génére les cartes du dealer,
  // et ça compare le jeu du dealer et du player,
  // ça met fin au jeu en annonçant le gagnant.
  onClickStop = () => {
    const cardSelectedDealer = this.rndCarte()
    const cardSelectedDealer2 = this.rndCarte()

    const valueCarteDealer = this.transformCardIntoInt(cardSelectedDealer.split("")[0])
    const valueCarteDealer2 = this.transformCardIntoInt(cardSelectedDealer2.split("")[0])

    const cardsDealer = [cardSelectedDealer, cardSelectedDealer2]

    let dealerValue = valueCarteDealer + valueCarteDealer2

    let endGameAndWinner = {
      endGame: false,
      nameOfWinner: ""
    }

    while (dealerValue < 17) {
      const cardSelectedDealer = this.rndCarte()
      const valueCarteDealer = this.transformCardIntoInt(cardSelectedDealer.split("")[0])

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
      endGame: endGameAndWinner.endGame
    })
  }

  // Lorsque l'on appuie sur le boutton Give ça donne une carte au player
  onClickGive = () => {
    const cardSelected = this.rndCarte()
    const valueCarte = this.transformCardIntoInt(cardSelected.split("")[0])
    const totalPlayerValue = this.state.counterPlayer + valueCarte

    this.setState({
      counterPlayer: totalPlayerValue,
      playerCardList: [...this.state.playerCardList, cardSelected]
    })
  }

  // Cette méthode donne la valeur de la carte tirée par le player ou dealer.
  transformCardIntoInt(cardValue) {

    if (cardValue === "K" || cardValue === "Q" || cardValue === "J" || cardValue === "A" || cardValue === "0") {
      cardValue = "10"
    }

    return parseInt(cardValue)
  }

  // Lorsque l'on appuie sur le boutton Start, cette méthode tire 2 cartes pour le player et lance le jeu.
  startGame = () => {
    const cardSelected = this.rndCarte()
    const cardSelected2 = this.rndCarte()

    const valueCarte = this.transformCardIntoInt(cardSelected.split("")[0])
    const valueCarte2 = this.transformCardIntoInt(cardSelected2.split("")[0])

    const firstPlayerValue = valueCarte + valueCarte2

    const firstTwoCardsPlayer = [cardSelected, cardSelected2]

    this.setState({
      counterPlayer: firstPlayerValue,
      playerCardList: firstTwoCardsPlayer,
      startGame: true
    })
  }

  // L'affichage lorsque le jeu démarre
  renderGame() {
    return (
      <div className="playGame" style={{ height: '100vh', position: 'relative' }}>

        <h1 style={{ color: '#feb236', textAlign: 'center' }}>Black Jack</h1>

        <Cartes key={"dealer"} cardList={this.state.dealerCardList} />

        {this.state.endGame && (<div className='winlost'>
          <h1>Winner is {this.state.nameOfWinner}</h1>
        </div>)}

        <Cartes key={"player"} cardList={this.state.playerCardList} />

        <div style={{ bottom: '20px', position: 'absolute' }} className="row col-6 offset-3 flex d-flex justify-content-between">

          <Button onClick={this.onClickGive} bcolor="#0d6efd"> Give </Button>

          <Button onClick={this.onClickStop} bcolor="#dc3545"> Stop </Button>
        </div>
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

