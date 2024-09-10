import axios from 'axios';
import { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';

export interface QuizQuestion {
    id: number;
    question: string;
    answers: string[];
    correct_answer: string;
}

export function useAxiosQuizData() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { state } = useUserContext();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<QuizQuestion[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const url = `${API_URL}&difficulty=${state.user.difficulty}`;
                const response = await axios.get(url);
                if (response.status != 200) {
                    throw new Error('Error fetching data');
                }
                const questions = response?.data.results.map((item: any, index: number) => ({
                    id: index + 1,
                    question: item.question,
                    answers: [
                        ...item.incorrect_answers,
                        item.correct_answer
                    ].sort(() => Math.random() - 0.5),
                    correct_answer: item.correct_answer
                }))
                setData(questions);
                setError(null);
            } catch (error: any) {
                setError(error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [API_URL]);
    return { data, error, loading };
}
