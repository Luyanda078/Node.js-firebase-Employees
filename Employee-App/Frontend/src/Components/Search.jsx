import React, { useState } from 'react';

const Search = ({ employees, onSearch }) => {
  const [searchId, setSearchId] = useState('');

  const handleSearch = () => {
    const employee = employees.find((emp) => emp.id === parseInt(searchId));
    if (employee) {
      onSearch(employee);
    } else {
      alert('Employee not found');
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button className="btn btn-secondary mt-2 w-100" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
