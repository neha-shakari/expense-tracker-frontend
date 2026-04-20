import { useAuth } from './AuthContext';

function useApi() {
  const { token } = useAuth();

  const apiCall = (url, options = {}) => {
    return fetch(`http://localhost:8080${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    });
  };

  return { apiCall };
}

export default useApi;