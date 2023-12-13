import React from "react";
import { shuffleArray } from "./ShuffleArray"
import { decode } from "html-entities";

const answerChoices = props.quizData.map((question) => {
    const incorrectAnswers = question.incorrect_answers
    const correctAnswer = question.correct_answer
    const combinedAnswers = [...incorrectAnswers, correctAnswer]
    const shuffledAnswers = shuffleArray(combinedAnswers)
    return shuffledAnswers.map((answer) => decode(answer))
  })

  console.log("answer choices", answerChoices)

export default function Result(props) {
  const handleAnswerSelection = (questionIndex, choiceIndex) => {
    // Handle the answer selection if needed
    // For example, you can log the selected answer
    console.log(`Selected answer for question ${questionIndex + 1}: ${choiceIndex}`)
  }

  const handleSubmit = () => {
    // Process user answers when the "Submit" button is clicked
    // For example, you can log all user answers
    console.log("User answers:", answerChoices)
  }

  return (
    <div className="question-div">
      <div>
        {props.quizData.map((question, questionIndex) => (
          <div className="question-answer-container" key={questionIndex}>
            <p>{decode(question.question)}</p>
            <div className="answer-choices-row">
              {answerChoices[questionIndex].map((choice, choiceIndex) => (
                <div className="answer-choice" key={choiceIndex}>
                  <button onClick={() => handleAnswerSelection(questionIndex, choiceIndex)}>
                    {choice}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="question-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}