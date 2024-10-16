import { useEffect, useState } from 'react';
import './ConfirmPayment.css';
import { confirmPayment } from '../Redux/APIs/PaymentServices';

const ConfirmPayment = () => {
  const [succes, setSucess] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      console.log(urlParams);
      const data = await confirmPayment(
        urlParams.get('email'),
        urlParams.get('price'),
        urlParams.get('time'),
        urlParams.get('token'),
        urlParams.get('PayerID')
      );
      setSucess(data.status);
    };
    fetchAPI();
  }, []);

  return (
    <>
      {succes === null ? (
        <div className='text'>Đang kiểm tra thanh toán...</div>
      ) : succes === 'COMPLETED' ? (
        <div className="card1">
          <div
            style={{
              borderRadius: '200px',
              height: '200px',
              width: '200px',
              background: '#F8FAF5',
              margin: '0 auto',
            }}
          >
            <i className="checkmark">✓</i>
          </div>
          <h1>Success</h1>
          <p>You have paid successfully, wish you a happy experience</p>
          <div className="wrap-name">
            <a href="/">Về trang chủ</a>
          </div>
        </div>
      ) : (
        <div className='card1'>
          <div className='text-1'>Thanh toán thất bại</div>
          <div className="wrap-name">
            <a href="/">Về trang chủ</a>
          </div>
        </div>
      )}
    </>
  );
};


export default ConfirmPayment;
