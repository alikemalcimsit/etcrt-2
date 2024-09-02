import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { getProductByID } from '../firebase/firebaseFunctions';
import { motion } from "framer-motion";
import ReviewForm from '../components/ReviewForm';
import ReviewsList from '../components/ReviewList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Helmet } from 'react-helmet';

export default function ProductDetail({ cart, setCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState(0);
  const [add, setAdd] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [adet, setAdet] = useState(1);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const q = query(collection(db, 'reviews'), where('productId', '==', product.id));
    const querySnapshot = await getDocs(q);
    const reviewsData = querySnapshot.docs.map(doc => doc.data());
    setReviews(reviewsData);
  };

  const plusProductCount = () => {
    if (adet < product.stock) {
      setAdet(adet + 1);
    }
  };

  const minesProductCount = () => {
    if (adet > 1) {
      setAdet(adet - 1);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductByID("urunler", id);
      setProduct(productData);
      if (productData.images && productData.images.length > 0) {
        setImages(productData?.images[0]); // ilk resmi varsayılan olarak ayarla
      }
    };

    fetchProduct();
  }, [id]);

  const CartFunc = () => {
    const cartProduct = {
      ...product,
      selectedSize,
      selectedColor,
      adet,
    };
    setCart(prev => [...prev, cartProduct]);
    setAdd(true);
  };

  const imageFuncNext = () => {
    const currentIndex = product.images.indexOf(images);
    if (product.images[currentIndex + 1]) {
      setImages(product.images[currentIndex + 1]);
    }
  };

  const imageFuncPrev = () => {
    const currentIndex = product.images.indexOf(images);
    if (product.images[currentIndex - 1]) {
      setImages(product.images[currentIndex - 1]);
    }
  };

  if (!product) return null;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "TRY",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": review.author || null,
      "reviewBody": review.content ||  null,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating ||null
      }
    }))
  };

  return (
    <div>
      <Helmet>
        <title>Ferrante Ricci</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`Ferrante & Ricci`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <Navbar cart={cart} />
      <motion.div
        className='xl:w-10/12 w-11/12 m-auto flex xl:flex-row flex-col items-center justify-center xl:my-32'
        key={product.id}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <div className='flex items-center justify-between xl:mb-0 mb-5 xl:mx-10'>
          <FaChevronLeft
            onClick={imageFuncPrev}
            className='cursor-pointer'
            size={30}
            color='black'
          />
          <img
            alt='product'
            className='h-[300px] md:h-[500px] object-cover border-2 border-black/50 w-full xl:w-[550px] rounded-md'
            src={images}
            loading="lazy"
          />
          <FaChevronRight
            onClick={imageFuncNext}
            className='cursor-pointer'
            size={30}
            color='black'
          />
        </div>
        <div className='py-6 px-6 mb-10 xl:mb-0 border xl:mx-10 xl:px-10 xl:py-10 rounded-md xl:h-[600px]'>
          <p className='text-xl xl:text-2xl font-semibold mb-2'>{product.name}</p>
          <p className='text-xl xl:text-2xl font-semibold xl:mb-5 text-[#A38070]'>
            {product.price}₺
          </p>
          <p className='text-sm xl:text-base font-semibold mb-3 xl:mb-5 text-black'>
            {product.description}
          </p>
          <span className='text-black/50'>Renk</span>
          <div className='flex items-center mb-3 xl:mb-5 gap-x-4 mt-2 justify-start'>
            {product.color.map((c, index) => (
              <div
                key={index}
                onClick={() => setSelectedColor(c)}
                style={{
                  backgroundColor: `#${c}`,
                  border: selectedColor === c ? '2px solid black' : '1px solid gray',
                }}
                className={`border w-10 text-center cursor-pointer h-10 ${selectedColor === c ? 'bg-black text-white' : ''}`}
              ></div>
            ))}
          </div>
          <div>
            <p className='mb-2'>Adet</p>
            <div className='flex items-center justify-start mb-3 xl:mb-5 gap-x-3'>
              <span className='border-2 cursor-pointer bg-black p-1 text-white px-2' onClick={minesProductCount}>-</span>
              {adet}
              <span className='border-2 cursor-pointer bg-black p-1 text-white px-2' onClick={plusProductCount}>+</span>
            </div>
          </div>
          <span className='text-black/50'>Beden</span>
          <div className='flex items-center justify-start mt-2 gap-x-4'>
            {product.size.map((s, index) => (
              <div
                key={index}
                onClick={() => setSelectedSize(s)}
                className={`text-semibold border w-10 cursor-pointer flex items-center justify-center text-xl text-center h-10 ${selectedSize === s ? 'bg-black text-white' : ''}`}
              >
                {s}
              </div>
            ))}
          </div>
          <button id='sepetEkle' onClick={CartFunc} className='w-6/12 xl:w-8/12 m-auto flex items-center justify-center font-bold py-4 mt-6 xl:mt-12 rounded-xl bg-black text-white'>
            {add === true ? "Sepete Eklendi" : " Sepete Ekle"}
          </button>
        </div>
      </motion.div>
      <ReviewForm productId={product.id} fetchReviews={fetchReviews} />
      <ReviewsList productId={product.id} reviews={reviews} />
      <Footer />
    </div>
  );
}
