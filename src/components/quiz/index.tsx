import { useState } from 'react';
import { useAxiosQuizData } from '../../axios/useAxiosQuizData';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { ErrorFallback } from '../ErrorBoundary';
import Feedback from './Feedback';
import Question from './Question';
import QuizButton from './QuizButton';

const Quiz = () => {
  const { dispatch } = useUserContext();
  const { state } = useUserContext();
  const navigate = useNavigate();
  const { data, error, loading } = useAxiosQuizData();
  const [feedback, setFeedback] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const currentQuestion = data?.[currentQuestionIndex];

  // early return
  if (loading) return <Loading />;
  if (error) return <ErrorFallback error={error} resetErrorBoundary={() => window.location.reload()} />;
  if (!data) return <p>No data available</p>;

  const handleNext = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setFeedback('');
      setHasAnswered(false);
      setHasSubmitted(false);
    }
  };

  const handleViewResult = () => {
    navigate('/result');
  };

  const handleAnswerClick = (answer: string) => {
    if (hasAnswered || hasSubmitted) return;
    setSelectedAnswer(answer);
    setFeedback('');
    if (currentQuestion?.correct_answer === null) {
      setFeedback("There is no answer for this question");
    }
  };

  const handleQuit = () => {
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
      <h1 className="text-xl font-bold m-9 text-purple-600 text-center">Question {currentQuestionIndex + 1} of 10</h1>
      <div className="flex items-center justify-between w-full max-w-lg mb-4">
        <p className="text-purple-500 text-2xl font-semibold italic">
          Your Current Score !!🫡
        </p>
        <button className="bg-green-500 text-white text-2xl font-xl font-bold py-2 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-colors">
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
      <div className="bg-white p-8 rounded-lg shadow-xl shadow-pink-400 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-purple-600 mb-4 text-center">Quiz Questions</h1>
        {currentQuestion && (
          <Question
            questionText={currentQuestion.question}
            answers={currentQuestion.answers}
            selectedAnswer={selectedAnswer}
            hasSubmitted={hasSubmitted}
            correctAnswer={currentQuestion.correct_answer}
            onAnswerClick={handleAnswerClick}
          />
        )}
        <div className="text-center mb-6">
          <Feedback message={feedback} />
        </div>
        <QuizButton
          onClick={hasSubmitted ? (currentQuestionIndex < data.length - 1 ? handleNext : handleViewResult) : handleSubmit}
          disabled={!selectedAnswer && !hasSubmitted}
          label={(currentQuestionIndex < data.length - 1 && hasSubmitted) ? 'Next' : (currentQuestionIndex === data.length - 1 && hasSubmitted) ? 'View Result' : 'Submit'}
        />
      </div>
    </div>
  );
};

export default Quiz;
