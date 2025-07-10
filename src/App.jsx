import React, { useState, useEffect } from 'react';
import Header from './Header';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); // For pagination
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        searchBooks(true); // true to reset
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchTerm]);

  const searchBooks = async (reset = false) => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError('');
    if (reset) {
      setBooks([]);
      setPage(1);
    }

    const currentPage = reset ? 1 : page;
    const offset = (currentPage - 1) * 10;

    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=10&offset=${offset}`);
      const data = await res.json();
      const newBooks = data.docs || [];
      setBooks(prev => (reset ? newBooks : [...prev, ...newBooks]));
      setHasMore(newBooks.length === 10);
      setPage(currentPage + 1);
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
        <button onClick={() => searchBooks(true)}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="results">
        {loading && <p>Loading...</p>}
        {books.length === 0 && !loading && !error && <p>No results found.</p>}
        {books.map((book, index) => (
          <div key={index} className="book-card">
            {book.cover_i && (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            )}
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author_name?.join(', ') || 'Unknown'}</p>
            <p><strong>First Published:</strong> {book.first_publish_year || 'N/A'}</p>
            <p><strong>Publisher:</strong> {book.publisher?.[0] || 'N/A'}</p>
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <div className="load-more">
          <button onClick={() => searchBooks(false)}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default App;
