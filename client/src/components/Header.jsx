import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '../redux/slices/userSlice';

const Header = () => {
  const {user} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = () =>{
    localStorage.removeItem('token')
    dispatch(setUser(null))
    dispatch(setToken(null))
    toast.success("Logout successfull.")
  }

  return (
    <header className="fixed top-0 w-full bg-[#1F2937] shadow-xl z-40">
      <div className="container mx-auto flex items-center justify-between py-2 px-5">
        {/* Logo Section */}
        <Link to={"/"} className='bg-white rounded-lg'>
          <img src="/logo.png" alt="Huddle Hub logo" width={130} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="hover:text-orange-500">Home</Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-orange-500">Features</Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-orange-500">Pricing</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500">Contact</Link>
            </li>
            <li>
            {
               user ?  <button onClick={handleLogout} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">Logout</button> :  <Link  to="/auth" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">Login</Link>
            }
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden z-50 relative">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 h-screen w-full bg-[#1F2937] flex flex-col items-center justify-center space-y-8 transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <ul className="text-center flex flex-col gap-5">
            <li>
              <Link to="/" className="text-white text-xl hover:text-orange-500" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/features" className="text-white text-xl hover:text-orange-500" onClick={toggleMenu}>
                Features
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="text-white text-xl hover:text-orange-500" onClick={toggleMenu}>
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white text-xl hover:text-orange-500" onClick={toggleMenu}>
                Contact
              </Link>
            </li>
            <li>
            {
               user ?  <button onClick={handleLogout} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">Logout</button> :  <Link  to="/auth" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">Login</Link>
            }
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
