import React from "react"
import './App.css'
import Intro from "../src/components/Intro"
import Questions from "../src/components/Questions"
import Result from "../src/components/Result"
import { decode } from 'html-entities'

function App() {
  const [userAnswers, setUserAnswers] = React.useState([])
  const [quizData, setQuizData] = React.useState([])
  const [startGame, setStartGame] = React.useState(false)
  const [resultScreen, setResultScreen] = React.useState(false)

  const handleAnswerSelection = (questionIndex, choiceIndex) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers]
      newAnswers[questionIndex] = choiceIndex
      return newAnswers
    })
  }

    const handleSubmit = () => {
      const decodedCorrectAnswers = quizData.map((question) => decode(question.correct_answer))
      const userScore = userAnswers.reduce(
        (score, userAnswer, index) =>
          userAnswer === decodedCorrectAnswers[index] ? score + 1 : score, 0
      )
      console.log("user score", userScore)
      // setResultScreen(true);
    }

  function toggleStart() {
    setStartGame((prevState) => !prevState);
    setResultScreen(false)
    setQuizData([])
  }

  React.useEffect(() => {
    console.log("Updated startGame state:", startGame);
  }, [startGame]);

  React.useEffect(() => {
    if (startGame) {
      fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
        .then((res) => res.json())
        .then((data) => {
          setQuizData(data.results);
          console.log(data.results)
 
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    }
  }, [startGame]);


    return (
      <>
        {!startGame && <Intro handleClickStart={toggleStart} />}
        {startGame && !resultScreen && <Questions quizData={quizData} handleSubmit={handleSubmit} />}
        {/* {startGame && resultScreen && <Result handClickReset={toggleStart} />} */}
      </>
    )
}

export default App
