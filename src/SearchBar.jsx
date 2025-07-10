import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookOpen } from 'lucide-react';
import SearchBar from './SearchBar';
import BookGrid from './BookGrid';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import FavoritesList from './FavoritesList';
import {
  searchBooks,
  clearError,
  clearBooks,
  selectBooks,
  selectLoading,
  selectError,
  selectSearchHistory,
  selectFavorites,
} from '../store/slices/bookSearchSlice';

const BookSearch = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const searchHistory = useSelector(selectSearchHistory);
  const favorites = useSelector(selectFavorites);
  const [activeTab, setActiveTab] = useState('search');

  const handleSearch = (searchTerm) => {
    dispatch(searchBooks(searchTerm));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleClearResults = () => {
    dispatch(clearBooks());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BookFinder Pro
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover books from around the world. Search, save, and explore your favorites!
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-full font-medium ${
              activeTab === 'search'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('search')}
          >
            Search
          </button>
          <button
            className={`px-4 py-2 rounded-full font-medium ${
              activeTab === 'favorites'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
        </div>

        {activeTab === 'search' ? (
          <>
            <SearchBar onSearch={handleSearch} onClear={handleClearResults} />
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} onClear={handleClearError} />}
            {books.length > 0 && <BookGrid books={books} />}
          </>
        ) : (
          <FavoritesList favorites={favorites} />
        )}
      </div>
    </div>      
  );
};

export default BookSearch;


        