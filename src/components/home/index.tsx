import React, { useEffect, useState } from 'react'
import BasicDetails from './BasicDetails'
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const Home = () => {
    const [isFormFilled, setIsFormFilled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { dispatch } = useUserContext();


    useEffect(() => {
      dispatch({ type: 'RESET' });
        if (!isFormFilled) {
            navigate('/', { replace: true });
        };
    }, [isFormFilled, navigate, dispatch]);


    const handleFormSubmit = () => {
        // Update state when the form is filled out
        setIsFormFilled(true);
    };


    return (
        <div className="flex flex-col md:flex-row flex-grow bg-gradient-to-r from-pink-500 via-purple-400 to-black-400 min-h-screen">
            {/* Left Side */}
            <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
                <h1 className="text-3xl font-bold text-white mb-6">
                    <span className='text-blue-900 text-6xl hover:text-7xl cursor-pointer '>Welcome 😃,</span>
                    <p className='mt-5 mb-8'> to the Ultimate Quiz Challenge!</p>
                </h1>
                <div className="bg-blue-900 border border-purple-700 rounded-lg p-10 shadow-2xl">
                    <p className="text-2xl text-pink-200 italic">
                        "Embrace the journey of learning. Every question answered is a step towards greatness!"
                    </p>
                    <p className="mt-4 text-lg text-pink-300">
                        "Keep pushing your limits and let your curiosity lead you to success."
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 flex justify-center items-center p-6">
                <div className="w-full max-w-md">
                    <BasicDetails onFormSubmit={handleFormSubmit} />
                </div>
            </div>
        </div>
    )
}

export default Home