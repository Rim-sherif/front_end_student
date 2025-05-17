import { useAuth } from '../hooks/useAuth';

export const LoginButton = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <button
      onClick={isAuthenticated ? logout : login}
      className="login-button"
    >
      {isAuthenticated ? 'Logout' : 'Login'}
    </button>
  );
}; 