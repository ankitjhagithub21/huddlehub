import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login, register } from '../api/user';
import { setToken, setUser } from '../redux/slices/userSlice';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration only
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      ...(isLogin ? {} : { name }), // Include name only if registering
    };

    setIsLoading(true);


    try {
      const response = isLogin ? await login(userData) : await register(userData);

      if (response.ok) {
        const data = await response.json();
        // Only set the token and show success toast if response is okay
       
        dispatch(setUser(data.user))
        dispatch(setToken(data.token))
        
        toast.success(data.message); 
        
        // Reset form fields
        setEmail('');
        setPassword('');
        setName('');

        navigate("/");
      
      } else {
        const errorData = await response.json();
        // Display error message if the response is not okay
        toast.error(errorData.message || 'Something went wrong!');
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-5">
      <div className="flex flex-col items-center rounded-xl p-8 space-y-6 border w-full max-w-md">
        <h1 className="text-2xl mt-2">{isLogin ? 'Login' : 'Register'}</h1>

        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 placeholder:text-gray-500 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          )}

          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 placeholder:text-gray-500 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 placeholder:text-gray-500 bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ${isLoading ? 'bg-orange-300' : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            disabled={isLoading}
            className="text-orange-500 ml-2 underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
