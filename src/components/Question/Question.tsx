import React, {useEffect, useState} from 'react';
import classNames from "classnames";

interface QuestionProps {
    questionNumber: number
    question: {
        text: string;
        choices: string[];
        correctAnswerIndex: number;
    };
    onAnswer: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = (props) => {
    const {questionNumber, question, onAnswer} = props
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);

    useEffect(() => {
        setIsSelected(false)
        setSelectedAnswer(null)
    }, [questionNumber]);

    const handleAnswerClick = (index: number) => {
        setSelectedAnswer(index);
        onAnswer(index === question.correctAnswerIndex);
        setIsSelected(true)
    };

    return (
        <div className="question">
            <h2>{`${questionNumber}. ${question?.text}`}</h2>
            <ul>
                {question?.choices.map((choice, index) => {

                    const questionChoiceClass = classNames("", {
                        "selected": selectedAnswer === index,
                        "correct": isSelected && question.correctAnswerIndex === index
                    }
                )
                    return <li
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        className={questionChoiceClass}
                    >
                        {choice}
                    </li>
                })}
            </ul>
        </div>
    );
};

export default Question;
