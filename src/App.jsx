import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    try {
     const response = await fetch("http://api.quotable.io/random");
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      setError("");
    } catch (error) {
      setError("Failed to fetch quote. Please try again.");
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchNewQuote = () => {
    fetchQuote();
  };

  return (
    <>
      <div className='My-app'>
        {error && <p className="error">{error}</p>}
        <div className='quote'>
          <h2>{quote}</h2>
        <p>- {author} -</p>
        </div>
        <button onClick={fetchNewQuote} className='btn'>New Quote</button>
      </div>
    </>
  );
}

export default App;
