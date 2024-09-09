import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';
import { AnswerOptions } from '../components/quiz';

export interface QuizQuestion {
    id: number;
    question: string;
    answers: AnswerOptions[];
    correct_answer: string;
}

export interface Answer {
    id: number;
    answer: string;
    correct: boolean;
}

export function useAxiosQuizData() {
    const [data, setData] = useState<QuizQuestion[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const API_URL = process.env.REACT_APP_API_URL;
     const { state } = useUserContext();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const url = `https://quizapi.io/api/v1/questions?apiKey=NZcUX62tqCNU0vTgmhG5rN0dr7RYLdWZVfK6ROiS&limit=10`;
                // const url = `${API_URL}?difficulty=${state.user.difficulty}`;
                const response = await axios.get(url);
                if (response.status !== 200) {
                    throw new Error('Error fetching data');
                }
                const questionss = response?.data.map((item: any) => ({
                    id: item.id,
                    question: item.question,
                    answers: [
                    item.answers
                    ],
                    correct_answer: item.correct_answer
                }))
                setData(questionss);
                setError(null);
            } catch (error: any) {
                setError(`Failed to fetch quiz data: ${error.message}`);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [API_URL]);

    return { data, error, loading };
}
