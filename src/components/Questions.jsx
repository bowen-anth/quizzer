import React from "react"
import ReactDOM from "react-dom"
import { decode } from 'html-entities'

export default function Result(props) {
    let questions = []
    let correctAnswers = []
    const answerChoices = []


        
    //shuffle answerChoices array code from coolaj86: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    props.quizData.forEach((question) => {
        const incorrectAnswers = question.incorrect_answers
        const correctAnswer = question.correct_answer
        const decodedCorrectAnswers = decode([correctAnswer])
        const combinedAnswers = decode([...incorrectAnswers, correctAnswer])
        correctAnswers.push(decodedCorrectAnswers)
        console.log('combinedAnswers', combinedAnswers)
        const shuffledAnswers = shuffleArray(combinedAnswers)
        answerChoices.push(shuffledAnswers)
    })
    console.log('correct answers', correctAnswers)
    console.log(answerChoices)

    questions = props.quizData.map((question) => decode(question.question))
    console.log('questions', questions)

    return (
        <div className="question-div">
            <svg className="intro-svg-top" xmlns="http://www.w3.org/2000/svg" width="158" height="141" viewBox="0 0 158 141" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z" fill="#FFFAD1"/>
            </svg>
            <div>
                {questions.map((question, index) => (
                    <div key={index}>
                        {question}<br />
                        {answerChoices[index].join(" ")}
                        <hr />
                    </div>
                ))}
                {/* {props.quizData.map((question, index) => (
                    <div key={index}>
                        <p>{decode(question.question)}</p>
                    </div>
                ))} */}
                {/* {shuffledAnswers.map((answer, index) => (
                    <div key={index}>
                        <p>{decode(answer)}</p>
                    </div> 
                ))}*/}

            </div>  

            <button className="question-button" onClick={props.handleClickSubmit}>Submit</button>
            <svg className="intro-svg-bottom" xmlns="http://www.w3.org/2000/svg" width="148" height="118" viewBox="0 0 148 118" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8"/>
            </svg>
        </div>
    )
}