import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OrderSuccessfulPage({ cart }) {
    const navigate = useNavigate();

    useEffect(() => {
        // 5 saniye sonra anasayfaya yönlendirme
        const timer = setTimeout(() => {
            navigate('/products');
        }, 5000);

        // Temizleme fonksiyonu
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div>
            <Navbar cart={cart}></Navbar>
            <div className='h-[60vh]'>
                <div className='flex flex-col h-full w-full items-center justify-center text-center text-3xl font-bold text-green-600 mt-20'>
                    <p>Satın Alma İşlemi Başarılı!</p>
                    <p className='text-xl mt-5 font-medium text-black'>Havale/EFT bilgisi için size WhatsApp üzerinden ulaşılacaktır.</p>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
