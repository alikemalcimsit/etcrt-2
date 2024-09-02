// src/components/Footer.js
import React from 'react';
import { AiFillInstagram, AiFillMail, AiFillTwitterCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import glitch from '../assets/giphy2.webp';
import { IoLogoWhatsapp } from 'react-icons/io';
import { Helmet } from 'react-helmet';

export default function Footer() {
  return (
    <>
      <Helmet>
        <title>Ferrante Ricci</title>
        <meta name="description" content="Ferrante Ricci'nin iletişim bilgilerini ve sosyal medya hesaplarını içeren footer bölümü. WhatsApp, Instagram ve e-posta ile iletişime geçebilirsiniz." />
        <meta property="og:title" content="Ferrante Ricci" />
        <meta property="og:description" content="Ferrante Ricci'nin iletişim bilgilerini ve sosyal medya hesaplarını içeren footer bölümü. WhatsApp, Instagram ve e-posta ile iletişime geçebilirsiniz." />
        <meta property="og:image" content={glitch} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ferrantericci.com/" />
      </Helmet>
      <div
        style={{
          backgroundImage: `url(${glitch})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        className='py-10 px-5'
      >
        <div className='flex flex-col'>
          <div className='w-full flex items-center justify-center'>
            <h1 className='monoton-regular text-white text-2xl md:text-6xl xl:text-8xl m-auto mb-10'>
              FERRANTE & RICCI<span className='text-4xl align-top'>®</span>
            </h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-base md:text-lg mb-5 text-white w-full m-auto text-center'>
              Ferrante&Ricci, özgün baskılı tişörtlerle stilinizi yansıtın. Modanın en yeni trendlerini keşfedin.
            </p>
          </div>
          <div className='w-full flex justify-around'>
            <div>
              <ul className='text-white flex items-center justify-center gap-4 md:gap-10'>
                <li>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://wa.me/905333702412'
                    aria-label='WhatsApp ile iletişime geçin'
                    className='flex items-center text-base mb-2 hover:underline gap-x-1 cursor-pointer'
                  >
                    <IoLogoWhatsapp size={20} />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://www.instagram.com/ferrantericci/'
                    aria-label='Ferrante Ricci Instagram sayfası'
                    className='flex items-center text-base mb-2 hover:underline gap-x-1 cursor-pointer'
                  >
                    <AiFillInstagram size={20} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href='mailto:info@ferrantericci.com'
                    aria-label='E-posta ile iletişime geçin'
                    className='flex items-center text-base mb-2 hover:underline gap-x-1 cursor-pointer'
                  >
                    <AiFillMail size={20} />
                    Mail
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <span className='text-white text-center mt-5'>©Ferrante&Ricci</span>
        </div>
      </div>
    </>
  );
}
