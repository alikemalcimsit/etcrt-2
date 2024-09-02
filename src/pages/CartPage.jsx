import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import aras from "../assets/aras.jpg";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Helmet } from 'react-helmet';
import PaymentPage from './Payments';
import iyzico from "../assets/iyzico.png"

export default function CartPage({ cart, setCart, setIsOrderSuccessful }) {
    console.log(cart);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [process, setProcess] = useState("Information");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [country, setCountry] = useState("");
    const [adress, setAdress] = useState("");
    const [city, setCity] = useState("");
    const [cvc, setCvc] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [postalCode, setPostalCode] = useState("");


    const [cardName, setCardName] = useState("");

    const [dateYear, setCardDateYear] = useState("");
    const [dateMonth, setCardDateMonth] = useState("");




    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `window.iyz = { token: 'cb40ebde-0e81-4939-b35a-7c7553a24f05', position: 'bottomRight', ideaSoft: false, pwi: true };`;
        document.body.appendChild(script);

        const externalScript = document.createElement('script');
        externalScript.type = 'text/javascript';
        externalScript.src = 'https://static.iyzipay.com/buyer-protection/buyer-protection.js';
        document.body.appendChild(externalScript);

        return () => {
            document.body.removeChild(script);
            document.body.removeChild(externalScript);
        };
    }, []);

    const removeCart = (id) => {
        const updatedCart = cart.filter((product) => product.id !== id);
        setCart(updatedCart);
    };
    const handlePayment = async () => {
        if (!validateInformationForm()) return;
    

        const paymentData = {
            city,
            postalCode,
            country,
            adress,
            email,
            firstName,
            surname,
            phone,
            totalPrice:1,
            cardName,
            cardNumber,
            cvc,
            expireMonth:dateMonth,
            expireYear:dateYear,
            
        };
    
        try {
            const response = await fetch('http://localhost:3001/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paymentData)
            });
    
            const data = await response.json();
            if (data.status === 'success') {
                handleOrderSuccess();
            } else {
                alert('Payment failed');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };
    

    const handleOrderSuccess = async () => {
        try {
            const ordersCollection = collection(db, 'orders');

            // Loop through each product in the cart and create an order for each
            for (let i = 0; i < cart.length; i++) {
                const product = cart[i];
                const order = {
                    userId: user ? user.uid : null,
                    email: email,
                    phone: phone,
                    name: firstName,
                    surname: surname,
                    county: country,
                    adress: adress,
                    process: "Teslim Edilmedi",
                    city: city,
                    postalCode: postalCode,
                    productName: product.name,
                    productId: product.id,
                    productImage: product.images[0],
                    productColor: product.selectedColor,
                    productSize: product.selectedSize,
                    productQuantity: product.adet,
                    productPrice: product.price,
                    shipprice: product.price * product.adet,
                };

                // Add each order to the Firestore collection
                await addDoc(ordersCollection, order);
            }

            // After all orders are successfully added, notify the user and clear the cart
            alert('Sipariş(ler) başarıyla verildi!');
            setCart([]);
            setIsOrderSuccessful(true);
            navigate('/order-success');
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const validateInformationForm = () => {
        if (!email || !phone || !firstName || !surname || !country || !adress || !city || !postalCode) {
            alert('Lütfen tüm alanları doldurun.');
            return false;
        }
        return true;
    };

    const controlProcess = () => {
        if (process === "Information") {
            return (
                <div>
                  
                    <Helmet>
                        <title>Ferrante Ricci</title>
                        <meta name="description" content="Sepetinizdeki ürünleri onaylayın ve siparişinizi tamamlayın." />
                        <meta property="og:title" content="Ferrante & Ricci" />
                        <meta property="og:description" content="Sepetinizdeki ürünleri onaylayın ve siparişinizi tamamlayın." />
                        <meta property="og:image" content={cart.length > 0 ? cart[0].images[0] : null} />
                        {/* JSON-LD Schema */}
                        <script type="application/ld+json">
                            {JSON.stringify(schemaData)}
                        </script>
                    </Helmet>
                    <p className='font-semibold'>İletişim Bilgileri</p>
                    <form className='mb-10'>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required className='border rounded-md w-full py-2 px-4 mb-5 mt-2 border-black/50'></input>
                        <input type='tel' placeholder='Telefon' value={phone} onChange={(e) => setPhone(e.target.value)} required className='border rounded-md w-full py-2 px-4 mb-10 border-black/50'></input>
                        <p className='font-semibold'>Kargo Bilgileri</p>
                        <div className='flex items-center justify-between mb-5 mt-2 gap-x-2'>
                            <input type='text' placeholder='İsim' value={firstName} onChange={(e) => setFirstName(e.target.value)} required className='border rounded-md w-full py-2 px-4 border-black/50'></input>
                            <input type='text' placeholder='Soyad' value={surname} onChange={(e) => setSurname(e.target.value)} required className='border rounded-md w-full py-2 px-4 border-black/50'></input>
                        </div>
                        <input type='text' placeholder='Ülke' value={country} onChange={(e) => setCountry(e.target.value)} className='border rounded-md w-full py-2 px-4 mb-5 border-black/50'></input>
                        <input type='text' placeholder='Adres' value={adress} onChange={(e) => setAdress(e.target.value)} required className='border rounded-md w-full py-2 px-4 mb-5 border-black/50'></input>
                        <div className='flex items-center justify-between mb-5 gap-x-2'>
                            <input type='text' placeholder='Şehir' value={city} onChange={(e) => setCity(e.target.value)} required className='border rounded-md w-full py-2 px-4 border-black/50'></input>
                            <input type='text' placeholder='Posta Kodu' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required className='border rounded-md w-full py-2 px-4 border-black/50'></input>
                        </div>
                        <div className='flex items-end justify-end'>
                            <button type="button" onClick={() => { if (validateInformationForm()) setProcess("Shipping"); }} className='bg-black flex items-center justify-around text-white rounded-md px-4 py-3 w-1/2'>
                                Kargo
                                <FaArrowRightLong></FaArrowRightLong>
                            </button>
                        </div>
                    </form>
                </div>
            );
        }

        if (process === "Shipping") {
            return (
                <div>
                    <p className='font-semibold'>Kargo Bilgileri</p>
                    <div className='w-full border border-black h-24 mt-10'>
                        <div className='flex px-6 items-center justify-between'>
                            <img src={aras} className='h-20 mt-2 flex items-center justify-center' alt='aras-kargo'></img>
                            <div>
                                <p>Aras Kargo</p>
                                <p>1-4 İş Günü İçinde Teslim</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-end justify-end mt-10'>
                        <button onClick={() => setProcess("Payment")} className='bg-black flex items-center justify-around text-white rounded-md px-4 py-3 w-1/2'>
                            Ödeme
                            <FaArrowRightLong></FaArrowRightLong>
                        </button>
                    </div>
                </div>
            );
        }

        if (process === "Payment") {
            return (
                <div>
                    <p className='font-semibold'>Ödeme Bilgileri</p>
               <div className='border p-4 mt-5 '>
                <div className='w-full flex items-center justify-center'>
                <img className='h-12 flex items-center justify-center mb-5' alt='iyizco' src={iyzico}></img>

                </div>
               <input type='text' placeholder='Kart Sahibinin İsmi' value={cardName} onChange={(e) => setCardName(e.target.value)} required className='border rounded-md w-full py-2 px-4 mb-5 border-black/50'></input>
               <input type='text' placeholder='Kart Numarası' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required className='border rounded-md w-full py-2 px-4 mb-5 border-black/50'></input>
                    <div className='flex items-center justify-between'>
                    <input type='text' placeholder='Kart Son Kullanım Yılı' value={dateYear} onChange={(e) => setCardDateYear(e.target.value)} required className='border rounded-md w-full py-2 px-4 mb-5 border-black/50'></input>
                    <input type='text' placeholder='Kart Son Kullanım Ayı' value={dateMonth} onChange={(e) => setCardDateMonth(e.target.value)} required className='border rounded-md w-full py-2 px-4 mb-5 border-black/50'></input>

                    </div>
               <input type='text' placeholder='CVC' value={cvc} onChange={(e) => setCvc(e.target.value)} required className='border rounded-md w-full py-2 px-4 mb-5 border-black/50'></input>

               </div>


                    <div className='flex items-end justify-end mt-10'>
                        <button onClick={handlePayment} className='bg-black flex items-center justify-around text-white rounded-md px-4 py-3 w-1/2'>
                            Şimdi Satın Al
                        </button>
                    </div>
                </div>
            );
        }
    };

    const colorFinder = (c) => {
        if (c === "FFFFFF") return "Beyaz";
        if (c === "000000") return "Siyah";
        if (c === "757a80") return "Füme";
    };

    const totalPrice = cart.reduce((acc, product) => acc + parseFloat(product.price, 2) * product.adet, 0);

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ShoppingCartPage",
        "name": "Ferrante & Ricci",
        "url": "https://www.ferrantericci.com/sepet",
        "description": "Sepetinizdeki ürünleri onaylayın ve siparişinizi tamamlayın.",
        "itemListElement": cart.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": product.name,
                "image": product.images[0],
                "sku": product.id,
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "TRY",
                    "price": product.price
                }
            }
        }))
    };

    return (
        <div>
            <Navbar cart={cart}></Navbar>
            <div className='w-11/12 xl:w-10/12 md:min-h-[80vh] m-auto'>
                {cart.length !== 0 ? (
                    <div>
                        <h1 className='text-center xl:text-left text-3xl xl:text-5xl text-[#A38070] font-bold'>Sepeti Onayla</h1>
                        <div className='flex md:flex-row flex-col md:items-center x:gap-x-0 md:gap-x-5 xl:items-start justify-between'>
                            <div className='md:w-2/3 xl:w-2/5'>
                                <div className='flex items-center text-lg mt-10 mb-10 font-semibold justify-center gap-x-10'>
                                    <p className={process === "Information" ? "text-black cursor-pointer" : "text-black/50 cursor-pointer"} onClick={() => setProcess("Information")}>Bilgiler</p>
                                    <p className={process === "Shipping" ? "text-black cursor-pointer" : "text-black/50 cursor-pointer"} onClick={() => setProcess("Shipping")}>Kargo</p>
                                    <p className={process === "Payment" ? "text-black cursor-pointer" : "text-black/50 cursor-pointer"} onClick={() => setProcess("Payment")}>Ödeme</p>
                                </div>
                                <div>
                                    {controlProcess()}
                                </div>
                            </div>
                            <div className='border border-black/50 xl:h-screen mb-20 rounded-md xl:w-2/5 p-4'>
                                <p className='text-xl font-semibold mb-4'>Sepetim</p>
                                {cart.map((product, index) => (
                                    <div key={index} className='flex border-b-2 border-black mb-4'>
                                        <img alt={product.name} src={product.images[0]} className='w-24 md:w-32 rounded-md mb-3 h-36 object-cover'></img>
                                        <div className='ml-4 w-full'>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-base md:text-lg'>{product.name}</p>
                                                <IoMdCloseCircle className='cursor-pointer text-lg md:text-3xl' onClick={() => removeCart(product.id)}></IoMdCloseCircle>
                                            </div>
                                            <p className='text-base md:text-lg'>Renk: {colorFinder(product.selectedColor)}</p>
                                            <p className='text-base md:text-lg'>Beden: {product.selectedSize}</p>
                                            <p className='text-base md:text-lg'>Adet: {product.adet}</p>
                                            <p className='text-base md:text-lg'>Fiyat: {product.price}₺</p>
                                        </div>
                                    </div>
                                ))}
                                <p className='w-full text-end text-xl font-semibold'>Toplam Fiyat: {totalPrice.toFixed(2)}₺</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='h-[100vh]'>
                        <h1 className='text-left text-5xl text-[#A38070] font-bold'>Sepetiniz Boş</h1>
                    </div>
                )}


            </div>
            <Footer></Footer>
        </div>
    );
}
