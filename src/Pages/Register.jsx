import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-gray-900/50 border border-gray-800 rounded-lg p-8'>
        <h2 className='text-3xl font-bold text-foreground text-center mb-6'>Register</h2>
        {error && <p className='text-red-400 text-sm mb-4 text-center'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='text-gray-300 text-sm mb-1 block'>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-foreground focus:outline-none focus:border-[#138695]'
              placeholder='Enter your name'
            />
          </div>
          <div>
            <label className='text-gray-300 text-sm mb-1 block'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-foreground focus:outline-none focus:border-[#138695]'
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label className='text-gray-300 text-sm mb-1 block'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className='w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-foreground focus:outline-none focus:border-[#138695]'
              placeholder='Min. 6 characters'
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-[#138695] text-white py-3 rounded font-semibold hover:bg-[#0f6b79] transition-colors disabled:opacity-50'
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className='text-gray-400 text-center mt-4'>
          Already have an account?{' '}
          <Link to='/login' className='text-[#138695] hover:underline'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
