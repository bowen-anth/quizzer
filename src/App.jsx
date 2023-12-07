import React from "react"
import './App.css'
import Intro from "../src/components/Intro"
import Questions from "../src/components/Questions"
import Result from "../src/components/Result"
import {encode} from 'html-entities';

encode('< > " \' & © ∆');
// -> '&lt; &gt; &quot; &apos; &amp; © ∆'

encode('< ©', {mode: 'nonAsciiPrintable'});
// -> '&lt; &copy;'

encode('< ©', {mode: 'nonAsciiPrintable', level: 'xml'});
// -> '&lt; &#169;'

encode('< > " \' & ©', {mode: 'nonAsciiPrintableOnly', level: 'xml'});
// -> '< > " \' & &#169;'

function App() {
  const [questions, setQuestions] = React.useState([])
  const [startGame, setStartGame] = React.useState(false)
  
  function toggleStart() {
    setStartGame((prevState) => !prevState);
  }

  React.useEffect(() => {
    console.log("Updated startGame state:", startGame);
  }, [startGame]);

//   React.useEffect(() => {
//     fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
//         .then(res => res.json())
//         .then(data => {
//             setQuestions(data.results)
//             console.log(data)
//         })
//         .catch(error => {
//             console.error("There was an error:", error)
//     })
// }, [])

    return (
      <>
        {!startGame && <Intro handleClick={toggleStart} />}
        {startGame && <Questions />}
        {startGame && <Result />}
      </>
    )
}

export default App
