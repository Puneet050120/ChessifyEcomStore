import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../store/authSlice';
import Navbar from '../components/Navbar';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isAuthenticated, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      // You can add a toast notification here
      console.error(message);
    }

    if (isAuthenticated || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isAuthenticated, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <>
      <Navbar />
      <div className="container py-20 flex justify-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
            {isError && <p className='text-red-500 text-center mb-2'>{message}</p>}
            <div className="space-y-4">
              <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" className="input" required />
              <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" className="input" required />
            </div>
            <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-center text-gray-400 text-sm mt-4">
              Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}