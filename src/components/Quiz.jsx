import React from "react"
import { shuffleArray } from "./ShuffleArray"
import { decode } from "html-entities"

export default function Quiz(props) {
    const [userAnswers, setUserAnswers] = React.useState([])
    const [shuffledAnswers, setShuffledAnswers] = React.useState([])
    const [selectedChoices, setSelectedChoices] = React.useState([])
    const [selectedChoiceIndex, setSelectedChoiceIndex] = React.useState([])
    const [userScore, setUserScore] = React.useState(null)
  

    React.useEffect(() => {
        const newShuffledAnswers = props.quizData.map((question) => {
          const incorrectAnswers = question.incorrect_answers
          const decodedIncorrectAnswers = Array.isArray(incorrectAnswers)
            ? incorrectAnswers.map((answer) => (typeof answer === "string" ? decode(answer) : answer))
            : []
    
          const correctAnswer = typeof question.correct_answer === "string"
            ? decode(question.correct_answer)
            : ""
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
            // Apply 'selected' class to the clicked choice
    const answerContainers = document.querySelectorAll('.answer-choices-row');
    const selectedChoiceContainer = answerContainers[questionIndex].querySelectorAll('.answer-choice-div')[choiceIndex]
    selectedChoiceContainer.classList.add('selected')

    // Remove 'selected' class from other choices in the same question
    const otherChoices = answerContainers[questionIndex].querySelectorAll('.answer-choice-div')
    otherChoices.forEach((choice, index) => {
      if (index !== choiceIndex) {
        choice.classList.remove('selected')
      }
    });
          setSelectedChoiceIndex(choiceIndex)
        }

  const handleSubmit = () => {
    const correctAnswers = props.quizData.map((question) => question.correct_answer)
    const decodedCorrectAnswers = correctAnswers.map((answer) => decode(answer))
    console.log("User Answers", userAnswers)
    console.log("decodedCorrectAnswers", decodedCorrectAnswers)

    const answerContainers = document.querySelectorAll('.answer-choices-row')
    
    userAnswers.forEach((userAnswer, questionIndex) => {
      const choices = answerContainers[questionIndex].querySelectorAll('.answer-choice-div')

      choices.forEach((choice, choiceIndex) => {
        const choices = answerContainers[questionIndex].querySelectorAll('.answer-choice-div')

        choices.forEach((choice, choiceIndex) => {
          choice.classList.remove('selected')
      
        if (choiceIndex === selectedChoiceIndex) {
          if (decodedCorrectAnswers[questionIndex] === userAnswer) {
            choice.classList.add('correct')
          } else {
            choice.classList.add('incorrect')
          }
        }
      })
    })
  })

      setSelectedChoiceIndex([])
  

    const userScore = userAnswers.reduce(
      (score, userAnswer, index) =>
        userAnswer === decodedCorrectAnswers[index] ? score + 1 : score, 
        0
    )
    console.log("user score", userScore)
    setUserScore(userScore)
  }

  const handlePlayAgain = () => {
    setUserAnswers([])
    setShuffledAnswers([])
    setSelectedChoices([])
    setSelectedChoiceIndex([])
    setUserScore(null)
    props.handleClickStart()
  }

  return (
    <div className="question-div">
            <svg className="intro-svg-top" xmlns="http://www.w3.org/2000/svg" width="158" height="141" viewBox="0 0 158 141" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z" fill="#FFFAD1"/>
            </svg>
        {props.quizData.map((question, questionIndex) => (
          <div className="question-answer-container" key={questionIndex}>
            <p className="question-paragraph">{decode(question.question)}</p>
            {shuffledAnswers[questionIndex] && (
            <div className="answer-choices-row">
              {shuffledAnswers[questionIndex].map((choice, choiceIndex) => (
                <div 
                  className={`answer-choice-div ${selectedChoices[questionIndex] === choiceIndex ? "selected" : ""}`}
                  key={choiceIndex}
                  onClick={() => handleAnswerSelection(questionIndex, choiceIndex)}
                >
                  <button className={`answer-choice-button ${selectedChoices[questionIndex] === choiceIndex ? "selected" : ""}`}>
                    {choice}
                  </button>
                </div>
              ))}
            </div>
            )}
            {<hr />}
          </div>
          
        ))}

      {userScore !== null && (
        <span className="user-score">
          Your scored {userScore} / {props.quizData.length} correct answers
        </span>
      )}

      <button className="submit-button" onClick={userScore !== null ? handlePlayAgain : handleSubmit}>
        {userScore !== null ? "Play Again" : "Check Answers"}
      </button>

      <svg className="intro-svg-bottom" xmlns="http://www.w3.org/2000/svg" width="148" height="118" viewBox="0 0 148 118" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8"/>
      </svg>
    </div>
  )
}