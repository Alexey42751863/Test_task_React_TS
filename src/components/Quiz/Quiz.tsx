import React, {useState} from "react";
import questions from "../../questions";
import Question from "../Question";

const Quiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [showScore, setShowScore] = useState<boolean>(false);
    const [score, setScore] = useState<Array<boolean>>([]);

    const handleAnswer = (isCorrect: boolean) => {

        setScore((prevScore) => {
            const newScores = [...prevScore];
            newScores[currentQuestion] = isCorrect;
            return newScores;
        });

        const timeoutId = setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion((prevQuestion) => prevQuestion + 1);
            } else {
                setShowScore(true)
            }

            clearTimeout(timeoutId)
        }, 500)

    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prevQuestion) => prevQuestion - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        }
    };

    const handleStart = () => {
        setCurrentQuestion(0)
        setShowScore(false)
        setScore([])
    }

    const calcResult = () => {
        return score.filter(el => el).length
    }

    return (
        <div className="quiz">
            <h1>Quiz App</h1>
            {showScore ?
                <>
                    <div className="score">
                        <h2>Your Score: {calcResult()}</h2>
                    </div>
                    <div className="navigation">
                        <button onClick={handleStart}>
                            Try again
                        </button>
                    </div>
                </>
                :
                <>
                    {questions.length > 0 && (
                        <Question
                            questionNumber={currentQuestion + 1}
                            question={questions[currentQuestion]}
                            onAnswer={handleAnswer}
                        />
                    )}
                    <div className="navigation">
                        <button onClick={handlePrevious}
                                disabled={currentQuestion === 0 || typeof score[currentQuestion - 1] === "boolean"}>
                            Previous
                        </button>
                        <button onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
                            Next
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

export default Quiz
