import React from 'react';

const CustomImage = ({ src, alt, width, height }) => (
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
);

export default CustomImage;
