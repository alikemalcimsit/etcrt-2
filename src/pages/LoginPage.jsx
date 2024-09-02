import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import glitch from "../assets/giphy2.webp";
import { Helmet } from 'react-helmet';

const Login = ({ cart }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Giriş başarılı!');
      navigate('/products'); // Giriş başarılıysa ürünler sayfasına yönlendir
    } catch (error) {
      console.error('Giriş hatası:', error);
      alert('Giriş hatası: ' + error.message);
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Ferrante & Ricci",
    "url": "https://www.ferrantericci.com/login",
    "description": "Ferrante Ricci e-ticaret sitesine giriş yapın ve alışverişe başlayın."
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${glitch})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      <Helmet>
        <title>Giriş Yap - Ferrante Ricci</title>
        <meta name="description" content="Ferrante Ricci e-ticaret sitesine giriş yapın ve alışverişe başlayın." />
        <meta property="og:title" content="Ferrante & Ricci" />
        <meta property="og:description" content="Ferrante Ricci e-ticaret sitesine giriş yapın ve alışverişe başlayın." />
        <meta property="og:image" content="https://www.ferrantericci.com/images/login-thumbnail.jpg" />
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <div className=' bg-white xl:w-1/4 w-10/12 rounded-md py-6  px-12 m-auto flex flex-col items-center justify-center border shadow-xl'>
        <h1 className="text-3xl mb-4 font-bold">Giriş Yap</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-full">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
          />
          <button type='submit' className="  shadow-black px-2 md:px-12  xl:px-8  py-2 md:py-3 text-sm  md:text-xl font-semibold   rounded-xl bg-black text-white">Giriş Yap</button>
          <Link to="/register"><p  className='text-center font-semibold text-sm md:text-lg'>Hesabınız yok mu? Üye ol</p></Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
