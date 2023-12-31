import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const KhaltiPayment = () => {
  const [paymentURl, setPaymentURL] = useState(null);
  
  const [totalPrice, setTotalPrice] = useState(0);
  const { userId, username, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const url = `http://localhost:4000/api/hawa/displayPayment`;
    const displayPayment = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setAuthenticated(true);
          const userPayments = data.filter(item => item.userId === userId && item.status==='pending');
        

          if (userPayments.length > 0) {
            const userPrices = userPayments.map(item => item.productPrice);
           
          
            
            // Calculate the total price by summing up the array of prices
            let totalPrice = 0;
            for (const price of userPrices) {
              totalPrice += price;
            }
            setTotalPrice(totalPrice*100);
            
          }
          
        }
      } catch (error) {
        console.error(error);
      }
    };
    displayPayment();
  }, [setAuthenticated, userId]);


  
  const handlePayment = async () => {
    
    const data = {
      "return_url": "http://localhost:3000/success",
      "website_url": "http://localhost:3000/",
      "amount": `${totalPrice}`,
      "purchase_order_id": "Order01",
      "purchase_order_name": "test",
      "customer_info": {
        "name": `${username}`,
        "email": `${username}@gmail.com`,
        "phone": "9800000001"
      }
    };

    try {
      const response = await fetch('http://localhost:4000/api/hawa/khaltiPayment', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const json = await response.json();
        setPaymentURL(json.khaltiUrl);
      } else {
        console.error('Failed to retrieve payment URL.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <button className="btn btn-primary my-2" onClick={handlePayment}>Khalti</button>
      {paymentURl && (
        <a href={paymentURl} target="_blank" rel="noopener noreferrer">
          Click here to complete payment
        </a>
      )}
    </div>
  );
};

export default KhaltiPayment;