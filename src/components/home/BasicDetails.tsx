import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router';

interface BasicDetailsProps {
    onFormSubmit: () => void; }

const BasicDetails: React.FC<BasicDetailsProps> = ({ onFormSubmit }) => {

    const navigate = useNavigate()
    const { dispatch } = useUserContext();

    // Form validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        difficulty: Yup.string().oneOf(['easy', 'medium', 'hard'], 'Invalid level').required('Required'),
    });

    return (
        <div className="flex-1 flex justify-center items-center p-6 h-full ">
            <Formik
                initialValues={{ name: '', difficulty: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                     
                    dispatch({ type: 'SET_USER', payload: values })
                    onFormSubmit()
                    navigate('/quiz')
                }}
                // onSubmit={(values) => {
                //     // console.log("values", values);
                //     dispatch({ type: 'SET_USER', payload: values })
                //     navigate('/quiz')
                // }}
            >
                {() => (
                    <Form className="bg-gradient-to-r from-purple-300 to-purple-100  p-6 md:px-10 md:py-9  lg:py-10 lg:px-12 rounded-lg shadow-lg shadow-purple-700 w-full max-w-md h-50">
                        <h2 className="text-2xl font-bold mb-6 md:mb-8 text-purple-900">Start Your Quiz</h2>

                        <div className="mb-4 md:mb-8">
                            <label htmlFor="name" className="block text-lg font-bold text-purple-900   md:mb-2">Name</label>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                className="mt-1 block w-full p-2 border-2 text-purple-800 font-semibold border-purple-300 rounded-md"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-600 text-base mt-1 " />
                        </div>

                        <div className="mb-4 md:mb-10">
                            <label htmlFor="difficulty" className="block text-lg font-bold text-purple-900   md:mb-2">Level of Difficulty</label>
                            <Field
                                as="select"
                                id="difficulty"
                                name="difficulty"
                                className="mt-1 block w-full p-2 border border-2 text-purple-800 font-semibold  border-purple-300 rounded-md"
                            >
                                <option value="">Select level</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </Field>
                            <ErrorMessage name="difficulty" component="div" className="text-red-600 text-base mt-1" />
                        </div>

                        <button
                            type="submit"
                            className="w-full  bg-gradient-to-r from-pink-500 via-purple-500 to-black text-white p-2 rounded-lg hover:bg-purple-500"
                        >
                            Start Quiz
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default BasicDetails;
