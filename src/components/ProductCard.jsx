import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {

  // Ürün bilgilerini kullanarak SEO uyumlu meta etiketler ve schema markup ekleyin
  const schemaMarkup = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images[0],
    "description": product.description,
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "TRY",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <Helmet>
        <title>Ferrante & Ricci</title>
        <meta name="description" content={`Ürün: ${product.name}. Fiyat: ${product.price}₺. ${product.description}`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={`Fiyat: ${product.price}₺. ${product.description}`} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:url" content={`https://ferrantericci.com/products/${product.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      <Link to={`/products/${product.id}`}>
        <motion.div 
          key={product.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          }} 
          className='border shadow-xl p-4 cursor-pointer'
        >
          <img 
            loading="lazy" 
            src={product?.images[0]} 
            alt={`Ürün: ${product?.name}`} 
            className='h-72 w-80'
          />
          <p className='text-sm mt-2 font-light'>{product?.type}</p>
          <div className='flex items-center justify-between'>
            <p className='text-lg font-semibold'>{product?.name}</p>
            <span className='font-semibold text-lg text-[#A38070]'>{product?.price}₺</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 mt-5'>
              {product?.size.map((s) => (
                <div key={s} className='text-semibold border w-8 text-center'>{s}</div>
              ))}
            </div>
            <div className='flex items-center justify-center mt-5 gap-2'>
              {product?.color.map((c) => (
                <div 
                  key={c}
                  style={{ backgroundColor: `#${c}` }} 
                  className='text-semibold border-[0.1px] border-black w-6 text-center h-6'
                ></div>
              ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </>
  );
}
