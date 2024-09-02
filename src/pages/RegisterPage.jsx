// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import glitch from "../assets/giphy2.webp";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [surname, setSurname] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Firebase Authentication ile kullanıcı kaydı yap
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Firestore'a kullanıcı bilgilerini ekle
      const userData = {
        userId:user.uid,
        email: user.email,
        phone: phone,
        surname: surname,
        name: name,
      };

      const userCollection = collection(db, "users");
      await addDoc(userCollection, userData);

      alert('Kayıt başarılı!');
      navigate('/products'); // Ana sayfaya yönlendir
    } catch (error) {
      console.error('Kayıt hatası:', error);
      alert('Kayıt hatası: ' + error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${glitch})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
      <div className=' bg-white xl:w-1/4 w-10/12 rounded-md py-6  xl:px-12 px-8 m-auto flex flex-col items-center justify-center border shadow-xl'>
        <h1 className="text-3xl mb-4 font-bold">Yeni Üyelik</h1>
        <form onSubmit={handleRegister} className="flex flex-col space-y-4 w-full">
          <input
            type="text"
            placeholder="Adınız"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Soyadınız"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="tel"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full"
          />
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
          <button type='submit' className="  shadow-black px-2 md:px-12  xl:px-8  py-2 md:py-3 text-sm  md:text-xl font-semibold   rounded-xl bg-black text-white">Üye Ol</button>
          <Link to="/login"><p  className='text-center font-semibold text-sm md:text-base'>Zaten hesabınız var mı? Giriş yap</p></Link>

        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
