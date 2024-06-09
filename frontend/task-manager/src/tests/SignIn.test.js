import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { SignIn } from '../views'; // Ensure this path is correct

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock signInWithEmailAndPassword from Firebase
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe('SignIn component', () => {
  it('should navigate to home page on successful sign-in', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    // Mock successful sign-in
    signInWithEmailAndPassword.mockResolvedValue();

    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      // Verify that signInWithEmailAndPassword was called with correct email and password
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object), // Your Firebase auth instance
        'test@example.com',
        'password123'
      );

      // Verify that user is navigated to home page
      expect(navigate).toHaveBeenCalledWith('/');
    });
  });
});
