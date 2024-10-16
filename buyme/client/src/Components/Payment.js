import { useEffect, useState } from "react";
import { createOrder, getPaymentconfig } from "../Redux/APIs/PaymentServices";
import SideBar from "../Screens/Dashboard/SideBar";
import './Payment.css';

const Payment = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [orderDetail, setorderDetail] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPaymentconfig();
                console.log(data.data);

                setPaymentData(data.data);
            } catch (error) {
                console.error("Error fetching payment config:", error);
            }
        };

        fetchData();
    }, []);
    const handleClick =  async (price, time) =>{
         console.log(price, time);
         const data = JSON.parse(localStorage.getItem("userInfo"))
         setorderDetail({
               email: data.email,
               price: price,
               type: time
         });

    }
    useEffect(() =>{
        const call = async () =>{            
            if(orderDetail != null){
                const result = await createOrder(orderDetail)
                window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${result.orderId}`;

            }  
        }
        call();
    },[orderDetail])
    return (
        <>
            <SideBar>
                <div className="wrapper-payment">
                    <div className="payment">
                        Register Member
                    </div>
                    <div className="wrap-pay">
                        {paymentData && paymentData.length > 0 ? (
                            paymentData.map((element, index) => (
                                <div className="plan-card" key={index}>
                                    <div className="plan-header">
                                        <h2>{element.time}</h2>
                                    </div>
                                    <div className="plan-body">
                                        <div className="plan-item">
                                            <span>Price</span>
                                            <strong>{element.price} $</strong>
                                        </div>
                                        <div className="plan-item">
                                            <span>Image and sound quality</span>
                                            <strong>{element.quality}</strong>
                                        </div>
                                        <div className="plan-item">
                                            <span>Resolution</span>
                                            <strong>{element.resolution}</strong>
                                        </div>
                                        <div className="plan-item">
                                            <span>Supported Devices</span>
                                            <strong>{element.supportDevices}</strong>
                                        </div>
                                        <div className="plan-item">
                                            <span>Number of devices your family can watch at once</span>
                                            <strong>{element.numberDevices}</strong>
                                        </div>
                                    </div>
                                    <div onClick={() => handleClick(element.price, element.time)} className="button-pay">Payment</div>
                                </div>
                            ))
                        ) : (
                            <p>No payment data available.</p>
                        )}
                    </div>

                </div>

            </SideBar>
        </>
    );
};

export default Payment;
