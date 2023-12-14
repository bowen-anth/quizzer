import React from "react"
import './App.css'
import Intro from "../src/components/Intro"
import Quiz from "../src/components/Quiz"
import Result from "../src/components/Result"
import { decode } from 'html-entities'

function App() {
  const [quizData, setQuizData] = React.useState([])
  const [startGame, setStartGame] = React.useState(false)
  const [resultScreen, setResultScreen] = React.useState(false)

  function toggleStart() {
    setStartGame((prevState) => !prevState);
    setResultScreen(false)
    setQuizData([])
  }

  React.useEffect(() => {
    console.log("Updated startGame state:", startGame)
  }, [startGame])

  React.useEffect(() => {
    if (startGame) {
      fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
        .then((res) => res.json())
        .then((data) => {
          setQuizData(data.results)
          console.log(data.results)
 
        })
        .catch((error) => {
          console.error("There was an error:", error)
        })
    }
  }, [startGame])


    return (
      <>
        {!startGame && <Intro handleClickStart={toggleStart} />}
        {startGame && !resultScreen && <Quiz quizData={quizData} />}
        {/* {startGame && resultScreen && <Result handClickReset={toggleStart} />} */}
      </>
    )
}

export default App
