import React from "react";
import { shuffleArray } from "./ShuffleArray"
import { decode } from "html-entities";

export default function Questions(props) {
    const [userAnswers, setUserAnswers] = React.useState([])
    const [shuffledAnswers, setShuffledAnswers] = React.useState([])

    React.useEffect(() => {
        const newShuffledAnswers = props.quizData.map((question) => {
          const incorrectAnswers = question.incorrect_answers
          const decodedIncorrectAnswers = decode(incorrectAnswers)
          const correctAnswer = decode(question.correct_answer)
          console.log(correctAnswer)
          
          const combinedAnswers = [...decodedIncorrectAnswers, correctAnswer]
          return shuffleArray(combinedAnswers)
        })
      
        setShuffledAnswers(newShuffledAnswers)
      }, [props.quizData])

        const handleAnswerSelection = (questionIndex, choiceIndex) => {
          setUserAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers]
            const selectedChoice = shuffledAnswers[questionIndex][choiceIndex]
            newAnswers[questionIndex] = selectedChoice
            console.log('new answers', newAnswers)
            return newAnswers
          })
        }

  const handleSubmit = () => {
    const correctAnswers = props.quizData.map((question) => question.correct_answer)
    const decodedCorrectAnswers = correctAnswers.map((answer) => decode(answer))
    console.log("User Answers", userAnswers)
    console.log("decodedCorrectAnswers", decodedCorrectAnswers)
    const userScore = userAnswers.reduce(
      (score, userAnswer, index) =>
        userAnswer === decodedCorrectAnswers[index] ? score + 1 : score, 
        0
    )
    console.log("user score", userScore)
    // setResultScreen(true)
  }

  return (
    //maybe remove extra div and make fragment ????????
    <div className="question-div">
      <div>
        {props.quizData.map((question, questionIndex) => (
          <div className="question-answer-container" key={questionIndex}>
            <p>{decode(question.question)}</p>
            {shuffledAnswers[questionIndex] && (
            <div className="answer-choices-row">
              {shuffledAnswers[questionIndex].map((choice, choiceIndex) => (
                <div className="answer-choice" key={choiceIndex}>
                  <button onClick={() => handleAnswerSelection(questionIndex, choiceIndex)}>
                    {choice}
                  </button>
                </div>
              ))}
            </div>
            )}
          </div>
        ))}
      </div>

      <button className="question-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}