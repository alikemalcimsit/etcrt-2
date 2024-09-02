import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import vintage from "../assets/vintage.jpg";
import simpson2 from "../assets/simpson2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { getProduct } from '../firebase/firebaseFunctions';

export default function ProductPage({ cart }) {
  const [productType, setProductType] = useState("VINTAGE");
  const [products, setProducts] = useState([]);
  const [selectFilter, setSelectFilter] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProduct("urunler", productType);
      setProducts(productsData);
    };

    fetchProducts();
  }, [productType]);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Ferrante & Ricci",
    "url": "https://www.ferrantericci.com/products",
    "description": `Geniş ${productType} baskılı ürün yelpazemizi keşfedin.`,
    "image": productType === "VINTAGE" ? vintage : simpson2,
  };

  return (
    <div>
      <Helmet>
        <title>Ferrante Ricci</title>
        <meta name="description" content={`Geniş ${productType} baskılı ürün yelpazemizi keşfedin.`} />
        <meta property="og:title" content="Ferrante & Ricci" />
        <meta property="og:description" content={`Geniş ${productType} baskılı ürün yelpazemizi keşfedin.`} />
        <meta property="og:image" content={productType === "VINTAGE" ? vintage : simpson2} />
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <Navbar cart={cart} />
      <div className='mb-10 overflow-hidden relative'>
        <div className='flex items-center justify-center md:gap-x-16 gap-x-10 xl:gap-x-20'>
          <div
            style={{
              backgroundImage: `url(${vintage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            onClick={() => setProductType("VINTAGE")}
            className={`${productType === "VINTAGE" ? "border-2 border-black" : ""} px-4 cursor-pointer py-4 text-center flex items-center rounded-xl justify-center`}
          >
            <h1 className='md:text-4xl text-xl xl:text-5xl monoton-regular text-center text-white'>VINTAGE</h1>
          </div>
          <div
            style={{
              backgroundImage: `url(${simpson2})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            onClick={() => setProductType("SIMPSONS")}
            className={`${productType === "SIMPSONS" ? "border-2 border-black" : ""} px-4 cursor-pointer py-4 text-center flex items-center rounded-xl justify-center`}
          >
            <h1 className="md:text-4xl text-xl xl:text-5xl monoton-regular text-center text-black">SIMPSONS</h1>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-x-2 xl:gap-x-10 w-10/12 m-auto justify-center mb-10'>
        <div onClick={() => setSelectFilter(1)} className={`${selectFilter === 1 ? "bg-[#A38070] text-white" : "bg-white"} border-2 w-36 cursor-pointer text-center h-12 flex items-center justify-center rounded-full text-[#A38070]`}>Çok Satanlar</div>
        <div onClick={() => setSelectFilter(2)} className={`${selectFilter === 2 ? "bg-[#A38070] text-white" : "bg-white"} border-2 w-36 cursor-pointer text-center h-12 flex items-center justify-center rounded-full text-[#A38070]`}>Yeni Ürünler</div>
        <div onClick={() => setSelectFilter(3)} className={`${selectFilter === 3 ? "bg-[#A38070] text-white" : "bg-white"} border-2 w-36 cursor-pointer text-center h-12 flex items-center justify-center rounded-full text-[#A38070]`}>İndirimli Ürünler</div>
      </div>
      <div className='flex mb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 md-gap-x-16 xl:grid-cols-3 m-auto gap-y-10 gap-x-20'>
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
