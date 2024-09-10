import { useUserContext } from '../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const { state } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();


  return (
    <header className="bg-gradient-to-r from-pink-400 via-purple-300 to-black-500 shadow-xl shadow-pink-100">
      <div className="container mx-auto px-3 md:px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-blue-800 cursor-pointer" onClick={() => navigate('/')}>QuizMastermind</h1>
        <p className="text-base md:text-lg lg:text-2xl text-blue-800 font-bold">Welcome , <span className="text-pink-600 text-lg md:text-2xl lg:text-3xl">{pathname === '/quiz' ? state.user.name : 'Guest'} 👋</span></p>
      </div>
    </header>
  )
}

export default Header
