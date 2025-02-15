import React, { useState } from "react";

const CollapsibleSection = ({ title, level = 2, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Ensure heading level is between h1 and h6
  const HeadingTag = `h${Math.min(Math.max(level, 1), 6)}`;

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fff", marginBottom: "4px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
      {/* Button for Title + Chevron */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "32px", // 🚀 Forces a compact height
          padding: "4px 8px",
          backgroundColor: "#f5f5f5",
          border: "none",
          cursor: "pointer",
          fontSize: "14px", // 🚀 Forces a readable but compact size
          fontWeight: "500",
          textAlign: "left"
        }}
      >
        {/* Title */}
        <HeadingTag
          style={{
            fontSize: "14px", // 🚀 Keeps title small
            margin: "0px",
            padding: "0px",
            flex: "1",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {title}
        </HeadingTag>

        {/* Chevron (Fixed Size & Position) */}
        <span style={{ marginLeft: "8px", flexShrink: "0" }}>
          {isOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          )}
        </span>
      </button>

      {/* Expandable Content Section */}
      {isOpen && (
        <div style={{ padding: "8px", fontSize: "16px", color: "#333", borderTop: "1px solid #ddd", backgroundColor: "#fff" }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
