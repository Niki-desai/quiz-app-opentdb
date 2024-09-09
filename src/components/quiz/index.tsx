import React, { useEffect, useState } from 'react';
import { useAxiosQuizData } from '../../axios/useAxiosQuizData';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';


export type AnswerOptions = {
  answer_a: string | null;
  answer_b: string | null;
  answer_c: string | null;
  answer_d?: string | null;
  answer_e?: string | null;
  answer_f?: string | null;
};

type Question = {
  id: number;
  question: string;
  answers: AnswerOptions[];
  correct_answer: string;
};


const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const { dispatch } = useUserContext();
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const [pendingAnswer, setPendingAnswer] = useState<string | null>(null);
  const { state } = useUserContext();

  const { data, error, loading } = useAxiosQuizData();
  // const API_URL = process.env.REACT_APP_API_URL;
  const currentQuestion = data?.[currentQuestionIndex];
  const navigate = useNavigate();
  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No data available</p>;
  // if(data){ setDatas(data)}


  const handleNext = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setPendingAnswer(null);
      setFeedback('');
      setHasAnswered(false);
      setHasSubmitted(false);
    }
  };

  const handleViewResult = () => {
    navigate('/result'); // Adjust the path if needed
  };

  const handleAnswerClick = (answer: string) => {
    if (hasAnswered || hasSubmitted) return;
    setSelectedAnswer(answer);
    setFeedback('');
    setPendingAnswer(answer);
    if (currentQuestion?.correct_answer === null) {
      setFeedback("There is no answer for this question")
      return
    }
  };

  const handleQuit = () => {
    // Clear user data and reset the quiz
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    if (currentQuestion?.correct_answer === null) {
      setFeedback("There is no answer for this question");
      setHasAnswered(true);
      setHasSubmitted(true);
      return;
    }

    if (selectedAnswer === String(currentQuestion?.correct_answer)) {
      setFeedback('Answer is correct');
      dispatch({ type: 'INCREMENT_SCORE' });
    } else {
      setFeedback('Wrong answer');
    }
    setHasAnswered(true);
    setHasSubmitted(true);
  };




  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-6">
   
      <div className="flex items-center justify-between w-full max-w-lg mb-4">
        <p className="text-purple-500 text-2xl font-semibold italic">
          Your Current Score !!🫡
        </p>
        <button  className="bg-green-500 text-white text-2xl font-xl font-bold py-2 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-colors">
          {state.quizScore}
        </button>
      </div>
      <div className="flex items-center justify-between w-full max-w-lg mb-4">
        <p className="text-red-700 text-sm italic">
          In case you want to discontinue, we will be here for you!
        </p>
        <button onClick={handleQuit} className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-700 transition-colors">
          Quit
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-xl shadow-pink-400 w-full max-w-lg" >
        <h1 className="text-2xl font-bold text-purple-600 mb-4 text-center">Quiz Questions</h1>
        <h1 className="text-2xl font-bold text-purple-600 mb-4 text-center">Question {currentQuestionIndex + 1} of 10</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{currentQuestion?.question}</h2>
          <ul className="space-y-2">
            {Object.keys(currentQuestion?.answers[0] || {}).map((key) => {
              const answerKey = key as keyof AnswerOptions;
              const answer = currentQuestion?.answers[0][answerKey];
              let answerClass = 'p-4 rounded-lg cursor-pointer transition-colors shadow-md hover:bg-purple-50';

              if (hasSubmitted) {
                if (answerKey === currentQuestion?.correct_answer) {
                  answerClass += ' bg-green-200 border-2 border-green-600 text-green-800'; // Correct answer in green
                }

                if (answerKey === selectedAnswer && answerKey !== currentQuestion?.correct_answer) {
                  answerClass += ' bg-red-200 border-2 border-red-600 text-red-800';
                }
              } else if (answerKey === selectedAnswer) {
                answerClass += ' bg-purple-200 border-2 border-purple-600 text-purple-800'; // Selected answer before submission
              } else {
                answerClass += ' bg-white hover:bg-purple-50'; // Default state
              }
              return (
                answer && (
                  <li
                    key={answerKey}
                    onClick={() => handleAnswerClick(answerKey)}
                    className={answerClass}
                  >
                    {answer}
                  </li>
                )
              );
            })}
          </ul>
        </div>
        <div className="text-center mb-6">
          {feedback && (
            <p className={`text-lg font-semibold ${feedback.startsWith('Wrong') || feedback.startsWith('There') ? 'text-red-600' : feedback.startsWith('Answer') ? 'text-green-600': 'text-purple-600'}`}>
              {feedback}
            </p>
          )}
        </div>
        <button
          onClick={hasSubmitted ? (currentQuestionIndex < data.length - 1 ? handleNext : handleViewResult) : handleSubmit}
          // onClick={hasSubmitted ? handleNext : handleSubmit}
          disabled={!selectedAnswer && !hasSubmitted}
          className={`bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors ${(!selectedAnswer && !hasSubmitted) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {(currentQuestionIndex < data.length - 1 && hasSubmitted) ? 'Next' : (currentQuestionIndex == data.length - 1 && hasSubmitted)  ? 'View Result' : 'Submit'}
        </button>

      </div>
    </div>
  );
};

export default Quiz;
