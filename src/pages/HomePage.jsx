// src/pages/HomePage.js
import React from 'react';
import glitch from "../assets/giphy2.webp";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function HomePage() {

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Ferrante & Ricci",
    "url": "https://www.ferrantericci.com/",
    "description": "Ferrante & Ricci ile benzersiz ve kaliteli ürünlerle alışverişe başlayın.",
    "publisher": {
      "@type": "Organization",
      "name": "Ferrante & Ricci",
      "logo": {
        "@type": "ImageObject",
        "url": "../assets/logo.png",
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "../assets/logo.png",
      "width": 800,
      "height": 600
    }
  };

  return (
    <div
      className="h-screen w-screen"
      style={{
        backgroundImage: `url(${glitch})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Helmet>
  <title>Ferrante & Ricci</title>
  <meta name="description" content="Ferrante & Ricci ile benzersiz ve kaliteli ürünlerle alışverişe başlayın." />
  <meta name="keywords" content="Ferrante Ricci, alışveriş, moda, kaliteli ürünler,baskılı tişört , ferrante tişört " />

  {/* Open Graph Tags */}
  <meta property="og:title" content="Ferrante & Ricci" />
  <meta property="og:description" content="Ferrante & Ricci ile benzersiz ve kaliteli ürünlerle alışverişe başlayın." />
  <meta property="og:image" content="/public/favicon.ico" />
  <meta property="og:url" content="https://www.ferrantericci.com/" />
  <meta property="og:type" content="website" />

  {/* Twitter Card Tags */}
  <meta name="twitter:card" content="../assets/logo.png" />
  <meta name="twitter:title" content="Ferrante & Ricci" />
  <meta name="twitter:description" content="Ferrante & Ricci ile benzersiz ve kaliteli ürünlerle alışverişe başlayın." />
  <meta name="twitter:image" content="../assets/logo.png" />
  <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
</Helmet>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="monoton-regular text-white text-3xl md:text-6xl xl:text-8xl mb-10">
          FERRANTE & RICCI<span className="text-4xl align-top">®</span>
        </h1>
        <Link to="/products">
          <button className="hover:text-black shadow-2xl shadow-black px-2 md:px-12 xl:px-24 py-3 md:py-6 text-sm md:text-xl font-bold hover:bg-white rounded-xl bg-black text-white">
            Alışverişe Başla
          </button>
        </Link>
      </div>
    </div>
  );
}
