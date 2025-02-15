import React from 'react';

const CustomImage = ({ src, alt, width, height, caption, citation }) => (
  <div style={{ textAlign: 'center', margin: '20px 0' }}>
    <img
      src={src}
      alt={alt}
      style={{
        width: width || 'auto',
        height: height || 'auto',
        display: 'block',
        margin: '0 auto',
      }}
    />
    {caption && <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>{caption}</p>}
    {citation && (
      <blockquote
        style={{
          fontSize: '12px',
          color: '#999',
          fontStyle: 'italic',
          marginTop: '5px',
          padding: '5px 10px',
          borderLeft: '4px solid #ddd',
          display: 'inline-block',
          textAlign: 'left',
          maxWidth: '80%',
        }}
      >
        {citation}
      </blockquote>
    )}
  </div>
);

export default CustomImage;
