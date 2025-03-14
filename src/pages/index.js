import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../css/custom.css"; // ✅ Import styles

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary")}>
      <div className="container hero-banner-container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className="hero-buttons">
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Welcome
          </Link>
        </div>
      </div>
    </header>
  );
}

// 🔥 Carousel Component to Display Latest Articles
const HomepageCarousel = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/latest-articles.json")
      .then((res) => res.json())
      .then((data) => setArticles(data.slice(0, 10))) // ✅ Show only the latest 10 articles
      .catch((error) => console.error("Error loading latest articles:", error));
  }, []);

  return (
    <div className="homepage-carousel-container">
      <h2 className="carousel-title">Latest Documents</h2>
      <div>
        <p>
          Select one of our latest documents or go to the <a href="/docs/intro"><strong>The Library</strong></a>
        </p>
      </div>
      {articles.length > 0 ? (
        <Swiper
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Autoplay]} // ✅ Add Autoplay module
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{ delay: 5000, disableOnInteraction: false }} // ✅ Auto-advance every 5 seconds
          loop={true} // ✅ Infinite loop
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper"
        >
          {articles.map((article, index) => (
            <SwiperSlide key={index} className="swiper-slide-home">
              <Link to={article.link}>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.alt || article.title}
                    className="homepage-carousel-image"
                  />
                )}
                <h3 className="homepage-carousel-text">{article.title}</h3>
                <p className="homepage-carousel-date">{article.date}</p> {/* ✅ Show Date */}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="no-articles-message">No latest articles found.</p> // ✅ Show message if empty
      )}
    </div>
  );
};

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Seek and you will find, knock and the door will be opened. Ask and you shall receive."
    >
      <HomepageHeader />
      <main>
        <HomepageCarousel /> {/* ✅ Ensure Carousel Is Included */}
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
