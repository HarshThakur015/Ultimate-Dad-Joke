import React, { useState, useEffect } from 'react';
// LandHome.jsx
import './LandHome.css'; // Adjust the path if the CSS is in a different folder


const LandHome = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch a joke from the API
  const fetchJoke = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }
      const data = await response.json();
      setJoke(data.value); // Setting the fetched joke in state
      setLoading(false);
    } catch (error) {
      setError(error.message); // If there's an error, set the error state
      setLoading(false);
    }
  };

  // Fetch joke when the component mounts
  useEffect(() => {
    fetchJoke();
  }, []); // Empty dependency array means it runs only once when the component mounts

  return (
    <div className="landhome">
      <h1>Welcome to the Joke Hub!</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          <p>{joke}</p>
          <button onClick={fetchJoke}>Get Another Joke</button>
        </div>
      )}
    </div>
  );
};

export default LandHome;
