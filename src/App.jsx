import React, { useState } from 'react';
import Header from './Header';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  console.log("App")

  const searchBooks = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError('');
    setBooks([]);

    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
      const data = await res.json();
      setBooks(data.docs.slice(0, 10));
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="results">
        {loading && <p>Loading...</p>}
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author_name?.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
