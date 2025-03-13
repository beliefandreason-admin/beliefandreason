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
          <h1 className="latest-title">Latest Articles</h1>
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
                  <p className="latest-article-date">{article.date}</p> {/* ✅ Show Date */}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  };
  

export default LatestArticles;
