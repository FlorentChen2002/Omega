import React, { useState } from 'react';
import axios from 'axios';
import './search.css';

function UserSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const res = await axios.get(`http://localhost:8000/api/search/utilisateurs?q=${query}`);
    setResults(res.data);
  };

  return (
    <div className="search-container">
      <h2>Recherche d'utilisateurs</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Pseudo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>

      <ul className="search-results">
        {results.map(user => (
          <li key={user._id}>{user.pseudo}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearchPage;
