import React, { useEffect } from "react";
import { RefTagger } from "react-reftagger";

export default function Root({ children }) {
  // Function to reinitialize Reftagger
  const reinitializeReftagger = () => {
    setTimeout(() => {
      console.log("Re-initializing Reftagger...");
      if (window.RefTagger && window.RefTagger.tag) {
        window.RefTagger.tag();
      } else {
        console.warn("Reftagger is not initialized yet.");
      }
    }, 300); // Delay of 300ms
  };

  useEffect(() => {
    // Trigger Reftagger on initial load
    reinitializeReftagger();

    // Reinitialize Reftagger on route updates
    window.addEventListener("docusaurus.routeUpdate", reinitializeReftagger);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("docusaurus.routeUpdate", reinitializeReftagger);
    };
  }, []);

  return (
    <>
      {/* Initialize RefTagger for the first load */}
      <RefTagger
        bibleVersion="ESV"
        tagChapters={true}
        tooltip={{
          scrollLock: true,
          theme: "light",
        }}
        container="#__docusaurus"
      />
      {children}
    </>
  );
}
