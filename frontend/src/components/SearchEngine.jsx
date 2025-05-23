import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'; // Magnifying glass icon

const SearchEngine = ({ search, setSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { backendurl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    const trimmed = searchTerm.trim();
    setSearch(trimmed);
    navigate('/products');
  };

  return (
    <div className="flex items-center w-full max-w-xl h-12 border border-gray-400 rounded-full overflow-hidden bg-white">
      <div className="pl-4 pr-2 text-gray-500">
        <FiSearch className="w-5 h-5" />
      </div>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for anything"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.trimStart())}
        className="flex-grow px-2 py-2 text-gray-800 bg-transparent border-none outline-none"
        onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
      />
    </div>
  );
};

export default SearchEngine;
