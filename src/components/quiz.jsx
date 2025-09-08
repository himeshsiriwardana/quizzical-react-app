import { TailSpin } from 'react-loading-icons'

export function Quiz(props) {

    function displayQuestions() {
        return props.questionInfo.map((question, index1) => {
            return (
                <div className="element" key={index1}>
                    <h2 className="question">{question.question}</h2>
                    <div className="radio-buttons">
                        {question.all_answers.map((answer, index2) => {
                            return (
                                <div key={index2}>
                                    <input 
                                        type="radio"
                                        id={`${question.question}-${answer}`}
                                        name={question.question}
                                        value={answer}
                                        checked={props.guessedAnswers[index1] === answer} 
                                        onChange={() => {recordAnswers(answer, index1)}}
                                        disabled={props.gameOver}
                                    />
                                    <label 
                                        style={props.gameOver ? 
                                                (props.correctAnswerIndex[index1] === index2 ? 
                                                    (props.givenAnswerIndex[index1] === index2 ? 
                                                        {backgroundColor:"#94D7A2", border: "none"} : {backgroundColor:"#94D7A2", opacity: "0.5", border: "none"}) :
                                                        (props.givenAnswerIndex[index1] !== -1 &&  props.givenAnswerIndex[index1] === index2) ? 
                                                                {backgroundColor : "#F8BCBC", opacity: "0.5", border: "none"} : {opacity: "0.5"}) : 
                                                {}}
                                    htmlFor={`${question.question}-${answer}`}>{answer}
                                    </label>
                                </div>
                            )
                        })}
                        </div>
                    <hr />
                </div>)
        })
    }

    function recordAnswers(answer, index) {
        props.setGuessedAnswers(prevAnswers => {
            const array = [...prevAnswers]
            array[index] = answer;
        return array;
    });
    }

    function displayNumberOfCorrectAnswers() {
        return (props.gameOver && !props.gameWon) && <span className="correct-answer number">{`You scored ${props.correctAnswerCount}/5 correct answers`}</span> 
    }

    function resetGame() {
        props.setGameOver(false);
        props.setGameWon(false);
        props.setGuessedAnswers(Array(5).fill(""));
        props.setLoading(true);
    }

    return (
        <div className="quiz-page">
            <div className="blob1" style={{top: "-15%" , right: "-10%"}}></div>
            <div className="blob2" style={{bottom: "-15%" , left: "-20%"}}></div>
            {props.loading ? 
            <div className="loading-icon">
                <TailSpin stroke="#4fa94d" />
                <span>Loading Questions...</span>
            </div> :
            <div className="quiz-area">
                {displayQuestions()}
            <div className="results-area">
            {!props.gameOver && <button className="check-answers" onClick={props.reviewAnswers}>Check answers</button>}
            {displayNumberOfCorrectAnswers()}
            {props.gameOver && <button className="play-again" onClick={resetGame}>Play again</button>}
            </div>
            </div>}
        </div>
            
    )}