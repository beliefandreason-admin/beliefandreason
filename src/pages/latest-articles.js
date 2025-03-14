import React, { useState, useEffect } from "react";
import Link from "@docusaurus/Link"; // ✅ Corrected import for Docusaurus Link
import Layout from "@theme/Layout";
import "../css/custom.css"; // ✅ Use global styles

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/latest-articles.json")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <Layout title="Latest Articles">
      <div className="container">
        <h1 className="latest-title">Latest Documents</h1>
        <div><p className="latest-description">
            Discover the latest articles from our library.
        </p>
            </div>
        <div className="latest-grid">
          {articles.map((article, index) => (
            <div key={index} className="latest-article-card">
              <Link to={article.link}>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.alt || article.title}
                    className="latest-article-image"
                  />
                )}
                <h3 className="latest-article-title">{article.title}</h3>
              </Link>
              {/* ✅ New Footer Container to Keep Date Fixed at Bottom */}
              <div className="latest-article-footer">
                <p className="latest-article-date">{article.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LatestArticles;
