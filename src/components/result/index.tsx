import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const Result = () => {
  const { state, dispatch } = useUserContext();
  const navigate = useNavigate();

  const { quizScore } = state;

  // Define message based on score
  const getCongratulatoryMessage = (score: number) => {
    if (score < 5) {
      return "No worries, at least you tried!";
    } else {
      return "Keep trying, you're doing so good! 🎊🎊";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 to-black-500 p-6">
      <div className="bg-white p-10 rounded-lg shadow-xl shadow-purple-500 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-purple-800 mb-4 text-center">Congratulations!!! 🎉🎉</h1>
        <p className="text-xl text-green-600 font-semibold   mb-4 text-center">You participated in the quiz.</p>
        <div className="bg-gradient-to-r from-purple-300 to-pink-300 p-6 rounded-lg shadow-md mb-4 mt-6   shadow-purple-500 ">
          <h2 className="text-3xl font-semibold text-gray-800">Results</h2>
          <p className="text-lg text-purple-700">Total Questions Served: <span className="font-bold">{10}</span></p>
          <p className="text-lg text-green-700">Total Correct Questions: <span className="font-bold">{quizScore}</span></p>
          <p className="text-lg text-red-700">Total Incorrect Questions: <span className="font-bold">{Number(10-quizScore)}</span></p>
        </div>
        <div className="text-center mb-6">
          <p className={`text-lg font-semibold ${quizScore < 5 ? 'text-red-600' : 'text-purple-600'}`}>
            {getCongratulatoryMessage(quizScore)}
          </p>
        </div>
        <button
          onClick={() => { navigate('/'); dispatch({ type: 'RESET' }) }}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Result;
