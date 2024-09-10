import React, { createContext, useReducer, useContext, ReactNode } from "react";

export type User = {
    name: string;
    difficulty: string;
};

export type QuizState = {
    user: User;
    quizScore: number;
    length: number | undefined;
    finished: boolean | null;
    lastRoute: string | null;
};

type Action =
    | { type: "SET_USER"; payload: User }
    | { type: "INCREMENT_SCORE" }
    | { type: "SET_LENGTH"; payload: number }
    | { type: "SET_FINISHED"; payload: boolean }
    | { type: "RESET" }

type UserContextType = {
    state: QuizState;
    dispatch: React.Dispatch<Action>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialState: QuizState = {
    user: { name: "", difficulty: "" },
    quizScore: 0,
    length: undefined,
    finished: null,
    lastRoute: null,
};

const userReducer = (state: QuizState, action: Action): QuizState => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "INCREMENT_SCORE":
            return { ...state, quizScore: state.quizScore + 1 };
        case "SET_LENGTH":
            return { ...state, length: action.payload };
        case "SET_FINISHED":
            return { ...state, finished: action.payload };
        case "RESET":
            return initialState;
        default:
            const exhaustiveCheck: never = action;
            throw new Error(`Unknown action: ${exhaustiveCheck}`);
    }
};

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};