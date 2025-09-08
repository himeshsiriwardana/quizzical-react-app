import { useState, useEffect, use } from 'react'
import { Home } from './components/home'
import { Quiz } from './components/quiz'
import { decode } from 'html-entities'
import Confetti from 'react-confetti'
import LoadingIcons from 'react-loading-icons'

function App() {

  // state
  const [questionInfo, setQuestionInfo] = useState([]);
  const [guessedAnswers, setGuessedAnswers] = useState(Array(5).fill(""));
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver]  = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(guessedAnswers)

  //derived states
  const checkedAnswers = questionInfo.length ? guessedAnswers.map((answer, index) => answer === questionInfo[index].correct_answer): [];
  const givenAnswerIndex = questionInfo.length ? guessedAnswers.map((answer, index) => questionInfo[index].all_answers.indexOf(answer)): [];
  const correctAnswerIndex = questionInfo.length ? questionInfo.map((question) => question.all_answers.indexOf(question.correct_answer)) : [];
  const incorrectAnswerIndex = questionInfo.length ? guessedAnswers.reduce((acc, answer, index) => {
    if(answer !== questionInfo[index].correct_answer) {
      acc.push(index)
    }
    return acc;
  }, []) : [];

  const correctAnswerCount = questionInfo.length ? checkedAnswers.filter(ans => ans === true).length : 0;
  // functions
  function reviewAnswers()  {

    if(correctAnswerCount === 5) {
        setGameWon(true);
        setGameOver(true);
    }
    else {
      setGameWon(false);
      setGameOver(true);
    }


  } 

  async function fetchQuizData() {
    const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
    const data = await res.json();

    const decodedData = data.results.map((item) => {
      return (
        {...item, 
          question: decode(item.question), 
          correct_answer: decode(item.correct_answer), 
          incorrect_answers: item.incorrect_answers.map(ans => decode(ans)),
          all_answers: [decode(item.correct_answer), ...item.incorrect_answers.map(ans => decode(ans))].sort(() => Math.random() - 0.5)
        }
      )
    })
    setQuestionInfo(decodedData);
    setLoading(false);
  }

  useEffect(() => {
    if(gameStart && !gameOver){
      fetchQuizData();
    }
  }, [gameStart, gameOver])


  return (
    <>
    {gameWon && <Confetti />}
    <div className="app">
      {gameStart && <Quiz 
      questionInfo={questionInfo} 
        decode={decode} 
        setGuessedAnswers={setGuessedAnswers} 
        guessedAnswers={guessedAnswers}
        reviewAnswers={reviewAnswers}
        setGameOver={setGameOver}
        gameOver={gameOver}
        gameWon={gameWon}
        setGameWon={setGameWon}
        incorrectAnswerIndex={incorrectAnswerIndex}
        correctAnswerCount={correctAnswerCount}
        correctAnswerIndex={correctAnswerIndex}
        givenAnswerIndex={givenAnswerIndex}
        loading={loading}
        setLoading={setLoading}
        />}

      {!gameStart && <Home setGameStart={setGameStart} />}
    </div>
    </>
  )
}

export default App
