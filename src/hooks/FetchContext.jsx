import React, { createContext, useContext, useState, useCallback } from 'react';

const FetchContext = createContext();
export  const baseURL = 'https://bsbackend.onrender.com/';  
// export const baseURL = 'http://127.0.0.1:5000/';  

export function FetchProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Helper function to handle fetch requests
  const handleFetch = useCallback(async (endpoint, method, body = null) => {
    setLoading(true);
    setError(null);

    try {
      // Retrieve access token from localStorage
      const token = localStorage.getItem('access_token');
      
      const response = await fetch(`${baseURL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), 
        },
        body: body ? JSON.stringify(body) : null,
      });

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle error in specific request
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  // CRUD operations
  const get = useCallback((endpoint) => handleFetch(endpoint, 'GET'), [handleFetch]);
  const post = useCallback((endpoint, body) => handleFetch(endpoint, 'POST', body), [handleFetch]);
  const put = useCallback((endpoint, body) => handleFetch(endpoint, 'PUT', body), [handleFetch]);
  const del = useCallback((endpoint) => handleFetch(endpoint, 'DELETE'), [handleFetch]);

  return (
    <FetchContext.Provider value={{ get, post, put, del, loading, error }}>
      {children}
    </FetchContext.Provider>
  );
}

// Custom hook to use the FetchContext
export function useFetch() {
  return useContext(FetchContext);
}


