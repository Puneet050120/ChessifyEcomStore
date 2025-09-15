import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../store/authSlice';
import Navbar from '../components/Navbar';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      // You can add a toast notification here
      console.error(message);
    }

    // On successful registration, redirect to login
    // We can check for a success state if we add one

    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    dispatch(register(userData)).then(() => {
        navigate('/login');
    });
  };

  return (
    <>
      <Navbar />
      <div className="container py-20 flex justify-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleRegister} className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Create Account</h2>
            {isError && <p className='text-red-500 text-center mb-2'>{message}</p>}
            <div className="space-y-4">
              <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" className="input" required />
              <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" className="input" required />
              <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" className="input" required />
            </div>
            <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            <p className="text-center text-gray-400 text-sm mt-4">
              Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}