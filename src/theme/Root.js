import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { RefTagger } from 'react-reftagger';

const Root = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Ensure RefTagger is initialized
    const tagReferences = () => {
      if (window.refTagger && window.refTagger.tag) {
        window.refTagger.tag();
      }
    };

    // Use a slight delay to ensure the DOM updates before re-tagging
    setTimeout(tagReferences, 100);
  }, [location]);

  return (
    <>
      {children}
      <RefTagger bibleVersion="ESV" />
    </>
  );
};

export default Root;