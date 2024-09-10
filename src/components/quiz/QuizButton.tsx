// components/QuizButton.tsx
import React from 'react';

interface QuizButtonProps {
    onClick: () => void;
    disabled: boolean;
    label: string;
}

const QuizButton: React.FC<QuizButtonProps> = ({ onClick, disabled, label }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {label}
        </button>
    );
};

export default QuizButton;
