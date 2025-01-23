// Import React
import React from 'react';

// Create the DateDisplay component
const DateDisplay = ({ date }) => {
  // Format the date (optional)
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  // Render the date if it exists
  return (
    <div>
      {formattedDate && (
        <p style={{ fontStyle: 'italic', color: 'gray', marginTop: '1rem' }}>
          Published on: {formattedDate}
        </p>
      )}
    </div>
  );
};

export default DateDisplay;