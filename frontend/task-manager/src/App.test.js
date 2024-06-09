import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router-dom'; // Use MemoryRouter
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

// Mocking AuthProvider for testing purposes
jest.mock('./contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
  useAuth: jest.fn(),
}));

describe('App', () => {
  it('renders SignIn component when user is not authenticated', () => {
    // Mocking useAuth hook to return null (no authenticated user)
    const useAuthMock = jest.requireMock('./contexts/AuthContext').useAuth;
    useAuthMock.mockReturnValue({ currentUser: null });

    render(
      <Router initialEntries={['/signin']}> {/* Use MemoryRouter instead */}
        <App />
      </Router>
    );

    // Assert that SignIn component is rendered
    expect(screen.getByText('SignIn')).toBeInTheDocument();
  });

  it('redirects to SignIn page when user is not authenticated', () => {
    // Mocking useAuth hook to return null (no authenticated user)
    const useAuthMock = jest.requireMock('./contexts/AuthContext').useAuth;
    useAuthMock.mockReturnValue({ currentUser: null });

    render(
      <Router initialEntries={['/']}> {/* Use MemoryRouter instead */}
        <App />
      </Router>
    );

    // Assert that user is redirected to SignIn page
    expect(screen.getByText('SignIn')).toBeInTheDocument();
  });

  it('navigates to SignUp page', () => {
    // Mocking useAuth hook to return null (no authenticated user)
    const useAuthMock = jest.requireMock('./contexts/AuthContext').useAuth;
    useAuthMock.mockReturnValue({ currentUser: null });

    render(
      <Router initialEntries={['/signup']}> {/* Use MemoryRouter instead */}
        <App />
      </Router>
    );

    // Assert that SignUp page is rendered
    expect(screen.getByText('SignUp')).toBeInTheDocument();
  });

  it('renders TaskManager component when user is authenticated', () => {
    // Mocking useAuth hook to return a dummy authenticated user
    const useAuthMock = jest.requireMock('./contexts/AuthContext').useAuth;
    useAuthMock.mockReturnValue({ currentUser: { username: 'testUser' } });

    render(
      <Router initialEntries={['/']}> {/* Use MemoryRouter instead */}
        <App />
      </Router>
    );

    // Assert that TaskManager component is rendered
    expect(screen.getByText('TaskManager')).toBeInTheDocument();
  });
});
