import React, { useState } from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expireMonth, setExpireMonth] = useState('');
  const [expireYear, setExpireYear] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayment = async () => {
    const paymentData = {
      cardHolderName,
      cardNumber,
      expireMonth,
      expireYear,
      cvc
    };

    try {
      const response = await axios.post('http://localhost:3001/create-payment', paymentData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Ödeme Sayfası</h1>
      <input
        type="text"
        placeholder="Kart Sahibinin Adı"
        value={cardHolderName}
        onChange={(e) => setCardHolderName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Kart Numarası"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Son Kullanma Ayı"
        value={expireMonth}
        onChange={(e) => setExpireMonth(e.target.value)}
      />
      <input
        type="text"
        placeholder="Son Kullanma Yılı"
        value={expireYear}
        onChange={(e) => setExpireYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="CVC"
        value={cvc}
        onChange={(e) => setCvc(e.target.value)}
      />
      <button onClick={handlePayment}>Ödeme Yap</button>
    </div>
  );
};

export default PaymentPage;
