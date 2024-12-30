import React from "react";
import { RefTagger } from "react-reftagger";

const ReftaggerConfig = () => {
  return (
    <RefTagger
      bibleVersion="ESV" // Set your preferred Bible version
      tagChapters={true} // Enable tagging for chapters
      container="#__docusaurus" // Ensure this matches your site's main content container
      tooltip={{
        theme: "light",
        scrollLock: true,
      }}
    />
  );
};



export default ReftaggerConfig;
