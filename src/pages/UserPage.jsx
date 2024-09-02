import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getOrdersbyId } from '../firebase/firebaseFunctions';
import { Helmet } from 'react-helmet';

const UserPage = ({ cart }) => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);

  const handleLogout = () => {
    auth.signOut(); // Firebase Authentication'dan çıkış yap
  };

  const colorFinder = (c) => {
    if (c === "FFFFFF") return "Beyaz";
    if (c === "000000") return "Siyah";
    if (c === "757a80") return "Füme";
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getOrdersbyId("orders", user.uid);
      setOrders(ordersData);
    };

    fetchOrders();
  }, [user.uid]);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": orders.map((order, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": order.productName,
        "image": order.productImage,
        "sku": order.productId,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "TRY",
          "price": order.productPrice,
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  return (
    <div>
      <Helmet>
        <title>Ferrante Ricci - Siparişlerim</title>
        <meta name="description" content="Ferrante Ricci kullanıcı sipariş sayfası. Siparişlerinizi buradan görüntüleyebilirsiniz." />
        <meta property="og:title" content="Ferrante & Ricci" />
        <meta property="og:description" content="Ferrante Ricci kullanıcı sipariş sayfası. Siparişlerinizi buradan görüntüleyebilirsiniz." />
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <Navbar cart={cart} />
      <div className='min-h-[100vh] w-10/12 m-auto'>
        <h1 className='text-2xl font-bold mb-5'>Siparişlerim</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-x-5'>
          {orders.map((order) => (
            <div key={order.id} className='flex xl:flex-row flex-col items-center border-2 border-[#A38070] rounded-md xl:rounded-full my-5 xl:my-7 w-full justify-center xl:justify-start xl:gap-x-10 px-6 py-4'>
              <img className='text-lg rounded-full h-60 w-60 object-cover' src={order.productImage} alt={order.productName} />
              <div className='w-full flex items-center xl:items-start flex-col'>
                <p className='text-xl'>{order.productName}</p>
                <p className='text-xl'>Renk: {colorFinder(order.productColor)}</p>
                <p className='text-xl'>Beden: {order.productSize}</p>
                <p className='text-xl'>Adet: {order.productQuantity}</p>
                <p className='text-xl'>Fiyat: {order.productPrice * order.productQuantity}₺</p>
                <p className={order.process === "Teslim Edilmedi" ? "text-red-500 text-lg font-semibold flex items-end justify-end" : "text-green-500 text-lg font-semibold flex items-end justify-end"}>
                  {order.process}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
