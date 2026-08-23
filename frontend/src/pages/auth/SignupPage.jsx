// Ye file Signup page handle karti hai.
// Naye users yaha apni details submit karenge.
// Mock signup process through AuthContext run hoti hai.

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  // Agar user pehle se logged in hai toh usko dashboard bhej do
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Form submit par chalne wala function
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    // Frontend Validations
    if (!fullName || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsSubmitting(true);
      // Context se signup call kar rahe hain
      await signup(fullName, email, password);
      // Successful signup ke baad user directly logged in hoke dashboard chala jayega
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="signupBox w-full">
        <div className="titleBox text-center mb-8">
          <h2 className="badaTitle">Create an account</h2>
          <p className="chhotaText">Join UPSTAGE to practice mock interviews.</p>
        </div>

        <form onSubmit={handleSignup} className="formBox space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200">
              {error}
            </div>
          )}

          <Input 
            label="Full Name" 
            type="text" 
            placeholder="Jane Doe" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isSubmitting}
            required
          />

          <Input 
            label="Email" 
            type="email" 
            placeholder="jane@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
          
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            required
          />

          <Input 
            label="Confirm Password" 
            type="password" 
            placeholder="••••••••" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isSubmitting}
            required
          />

          <div className="btnBox">
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </Button>
          </div>
        </form>

        <div className="bottomText mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="linkText hover:underline">
            Log In
          </Link>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default SignupPage;
