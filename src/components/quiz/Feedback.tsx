// components/Feedback.tsx
import React from 'react';

interface FeedbackProps {
    message: string;
}

const Feedback: React.FC<FeedbackProps> = ({ message }) => {
    const feedbackClass = message.startsWith('Wrong') || message.startsWith('There')
        ? 'text-red-600'
        : message.startsWith('Answer')
            ? 'text-green-600'
            : 'text-purple-600';

    return (
        <p className={`text-lg font-semibold ${feedbackClass}`}>
            {message}
        </p>
    );
};

export default Feedback;
