import React from 'react';
import { useNavigate } from 'react-router-dom';

function YearSelector({ prefix, suffixes }) {
  const navigate = useNavigate();

  const handleYearSelect = (year, suffix) => {
    // Redirect to the selected year's page with the selected suffix
    navigate(`${prefix}/${year}/${suffix}`);
  };

  return (
    <div>
      {suffixes.map(suffix => (
        <button key={suffix} onClick={() => handleYearSelect('sy', suffix)}>{suffix}</button>
      ))}
    </div>
  );
}

export default YearSelector;