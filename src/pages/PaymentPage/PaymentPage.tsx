import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from '../PaymentPage/PaymentPage.module.scss';
import InputMask from 'react-input-mask';
import AddressInput from "../../components/AddressInput/AddressInput";

const PaymentPage = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cvv: '',
    expiryDate: '',
  });

  const handleCustomerInfoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'name') {
      newValue = value.replace(/[0-9]/g, '').slice(0, 20);
    } else if (name === 'address') {
      newValue = value.slice(0, 30);
    } else if (name === 'comment') {
      newValue = value.slice(0, 100);
    }

    setCustomerInfo((prev) => ({ ...prev, [name]: newValue }));
  };

  const handlePaymentInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'cardNumber') {
      newValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'cvv') {
      newValue = value.replace(/\D/g, '').slice(0, 3);
    } else if (name === 'expiryDate') {
      newValue = value.replace(/[^\d/]/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);

      if (value.length < paymentInfo.expiryDate.length && paymentInfo.expiryDate.endsWith('/')) {
        newValue = newValue.slice(0, -1);
      }
    }

    setPaymentInfo((prev) => ({ ...prev, [name]: newValue }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Здесь должна быть логика отправки данных на сервер
    console.log('Customer Info:', customerInfo);
    console.log('Payment Info:', paymentInfo);
  };

  return (
    <div className={styles.paymentPage}>
      <form onSubmit={handleSubmit} className={styles.paymentForm}>
        <h2 className={styles.heading}>Customer Information</h2>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={handleCustomerInfoChange}
          placeholder="Full Name"
          maxLength={25}
          pattern="[A-Za-z ]*"
          title="Name should not contain numbers."
          required
        />
        <InputMask
          mask="+7 (999) 999 99 99"
          className={styles.input}
          value={customerInfo.phone}
          onChange={handleCustomerInfoChange}
          placeholder="+7 (___) ___ __ __"
          type="tel"
          name="phone"
          required
        />
        <AddressInput className={styles.input} />
        <textarea
          className={styles.textarea}
          name="comment"
          value={customerInfo.comment}
          onChange={handleCustomerInfoChange}
          placeholder="Comment"
          maxLength={100}
        />
        <h2 className={styles.heading}>Payment Details</h2>
        <input
          className={styles.input}
          type="text"
          name="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={handlePaymentInfoChange}
          placeholder="Card Number"
          maxLength={19}
          pattern="\d{0,4} \d{0,4} \d{0,4} \d{0,4}"
          required
        />
        <input
          className={styles.input}
          type="text"
          name="cvv"
          value={paymentInfo.cvv}
          onChange={handlePaymentInfoChange}
          placeholder="CVV"
          maxLength={3}
          pattern="\d{3}"
          required
        />
        <input
          className={styles.input}
          type="text"
          name="expiryDate"
          value={paymentInfo.expiryDate}
          onChange={handlePaymentInfoChange}
          placeholder="Expiry Date (MM/YY)"
          maxLength={5}
          pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
          required
        />
        <button type="submit" className={styles.submitButton}>Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentPage;
