import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';  // Import necessary testing utilities
import '@testing-library/jest-dom';  // Provides additional matchers for assertions
import { useUserContext } from '../../context/UserContext';  // Import the UserContext hook
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';  // Router is needed for testing navigation
import BasicDetails from '../home/BasicDetails';  // Import the component to be tested

// 1. Mocking the useUserContext function to simulate the dispatch function
jest.mock('../../context/UserContext', () => ({
    useUserContext: jest.fn(),
}));

// Mock function to simulate dispatching actions to context
const mockDispatch = jest.fn();

describe('BasicDetails Component', () => {
    // 2. Set up before each test to ensure a fresh mocked context
    beforeEach(() => {
        (useUserContext as jest.Mock).mockReturnValue({
            dispatch: mockDispatch,  // Provide the mock dispatch function
        });
    });

    // 3. Test case 1: Check if form fields are rendered correctly
    test('renders form fields correctly', () => {
        render(
            <Router>
                <BasicDetails onFormSubmit={() => { }} />  // Render component inside a Router for navigation support
            </Router>
        );

        // Check if the name input field is rendered
        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();

        // Check if the difficulty select field is rendered
        expect(screen.getByLabelText(/Level of Difficulty/i)).toBeInTheDocument();

        // Check if the Start Quiz button is rendered
        expect(screen.getByText(/Start Quiz/i)).toBeInTheDocument();
    });

    // 4. Test case 2: Validate required fields and show error messages when fields are empty
    test('validates required fields', async () => {
        render(
            <Router>
                <BasicDetails onFormSubmit={() => { }} />
            </Router>
        );

        // Simulate form submission by clicking the Start Quiz button without filling any fields
        fireEvent.click(screen.getByText(/Start Quiz/i));

        // Wait for validation error messages to appear
        expect(await screen.findByText(/Required/i)).toBeInTheDocument();  // Expect "Required" error for the name field
        expect(await screen.findByText(/Invalid level/i)).toBeInTheDocument();  // Expect "Invalid level" error for the difficulty field
    });

    // 5. Test case 3: Check that the form submits valid data and dispatches an action
    test('submits form with valid data', async () => {
        render(
            <Router>
                <BasicDetails onFormSubmit={() => { }} />
            </Router>
        );

        // Simulate entering a name in the name field
        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });

        // Simulate selecting a difficulty level
        fireEvent.change(screen.getByLabelText(/Level of Difficulty/i), { target: { value: 'medium' } });

        // Submit the form by clicking the Start Quiz button
        fireEvent.click(screen.getByText(/Start Quiz/i));

        // Wait for the mock dispatch function to be called with the correct action
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'SET_USER',  // Ensure the correct action type is dispatched
                payload: {
                    name: 'John Doe',  // Ensure the correct name is dispatched
                    difficulty: 'medium',  // Ensure the correct difficulty level is dispatched
                },
            });
        });
    });

    // 6. Test case 4: Ensure the user is navigated to the /quiz route after form submission
    test('navigates to /quiz on successful submit', async () => {
        const navigate = jest.fn();  // Mock the navigate function from react-router

        render(
            <Router>
                <BasicDetails onFormSubmit={() => { }} />
            </Router>
        );

        // Mock the return value of useNavigate (the navigation function)
        (useNavigate as jest.Mock).mockReturnValue(navigate);

        // Simulate entering a name and selecting difficulty
        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Level of Difficulty/i), { target: { value: 'medium' } });

        // Submit the form
        fireEvent.click(screen.getByText(/Start Quiz/i));

        // Wait for the navigation function to be called with the correct route
        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith('/quiz');  // Ensure navigation to /quiz route
        });
    });
});
