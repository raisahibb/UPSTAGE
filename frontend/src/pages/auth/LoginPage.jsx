// Ye file Login page handle karti hai.
// Yaha authentication context ka use kar ke hum mock login process chala rahe hain.
// User ka email aur password validate karke handleLogin trigger hota hai.

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Agar user pehle se logged in hai toh usko dashboard bhej do
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Form submit par chalne wala function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic frontend validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsSubmitting(true);
      // Context se login function call kar rahe hain
      const user = await login(email, password);
      
      // Role ke hisaab se route decide karenge
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="loginBox w-full">
        <div className="titleBox text-center mb-8">
          <h2 className="badaTitle">Welcome back</h2>
          <p className="chhotaText">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleLogin} className="formBox space-y-5">
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200">
              {error}
            </div>
          )}

          <Input 
            label="Email" 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
          
          <div className="space-y-1">
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              required
            />
            <div className="flex justify-end">
              <a href="#" className="linkText hover:underline text-sm">
                Forgot password?
              </a>
            </div>
          </div>

          <div className="btnBox">
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Log In'}
            </Button>
          </div>
        </form>

        <div className="bottomText mt-6 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="linkText hover:underline">
            Create Account
          </Link>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;
