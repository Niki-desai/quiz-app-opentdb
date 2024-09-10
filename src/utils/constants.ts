export const difficultyOptions = [
    { value: '', label: 'Select level' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
];


// Define message based on score
export const getCongratulatoryMessage = (score: number) => {
    if (score < 5) {
        return "No worries, at least you tried!";
    } else {
        return "Keep trying, you're doing so good! 🎊🎊";
    }
};
