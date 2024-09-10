// components/Question.tsx
import React from 'react';

interface QuestionProps {
    questionText: string;
    answers: string[];
    selectedAnswer: string | null;
    hasSubmitted: boolean;
    correctAnswer: string | null;
    onAnswerClick: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({
    questionText,
    answers,
    selectedAnswer,
    hasSubmitted,
    correctAnswer,
    onAnswerClick,
}) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{questionText}</h2>
            <ul className="space-y-2">
                {answers.map((answer, index) => {
                    let answerClass = 'p-4 rounded-lg cursor-pointer transition-colors shadow-md hover:bg-purple-50';

                    if (hasSubmitted) {
                        if (answer === correctAnswer) {
                            answerClass += ' bg-green-200 border-2 border-green-600 text-green-800'; // Correct answer in green
                        }

                        if (answer === selectedAnswer && answer !== correctAnswer) {
                            answerClass += ' bg-red-200 border-2 border-red-600 text-red-800'; // Incorrect answer in red
                        }
                    } else if (answer === selectedAnswer) {
                        answerClass += ' bg-purple-200 border-2 border-purple-600 text-purple-800'; // Selected answer before submission
                    } else {
                        answerClass += ' bg-white hover:bg-purple-50'; // Default state
                    }
                    return (
                        <li
                            key={index}
                            onClick={() => onAnswerClick(answer)}
                            className={answerClass}
                        >
                            {answer}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Question;
