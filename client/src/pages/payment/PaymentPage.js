import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { id: idParam } = useParams(); // For single or multiple IDs
  const [productDetails, setProductDetails] = useState([]);
  const { userId, username, setAuthenticated } = useContext(AuthContext);
  const [paymentIds, setPaymentIds] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const ids = idParam.split(','); // Splitting multiple IDs
      const fetchedDetails = [];
      for (const id of ids) {
        const url = `http://localhost:4000/api/hawa/displaySingleCart/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          fetchedDetails.push(data);
        }
      }
      setProductDetails(fetchedDetails);
    };

    fetchCart();
  }, [idParam]);

  // Fetch paymentIds
  useEffect(() => {
    const url = `http://localhost:4000/api/hawa/displayPayment`;
    const displayPayment = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          setAuthenticated(true);
          const data = await response.json();
          const userPayments = data.filter((item) => item.userId === userId && item.status === 'pending');
          const ids = userPayments.map((payment) => payment.productId);
          const quantitiesP = userPayments.map((payment) => ({
            productId: payment.productId,
            quantity: payment.quantity,
          }));
          setQuantities(quantitiesP);
          setPaymentIds(ids);
        } else {
          // Handle error if response is not OK
          console.error('Error fetching payment data');
        }
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };
    displayPayment();
  }, [setAuthenticated, userId]);

  const handlePayment = async (product) => {
    setAuthenticated(true);

    // Check if the product ID exists in paymentIds
    const foundQuantity = !!quantities.find((item) => item.productId === product._id && item.quantity === product.quantity);
    
    if (!paymentIds.includes(product._id) && !foundQuantity  ) {
   
      const status = 'pending';
      const { _id: productId, name: productName, price, quantity } = product;
      const productPrice = price * quantity;
      const info = { userId, status, username, productId, productName, productPrice, quantity };
      const url = 'http://localhost:4000/api/hawa/paymentRecord';

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (response.ok) {
        console.log(json);
      }
    }else if(!foundQuantity && paymentIds.includes(product._id)){
    
      const { _id: productId, quantity,price } = product;
      const productPrice = price * quantity;
      const info = {productId,quantity,productPrice};
      const url = `http://localhost:4000/api/hawa/updatePaymentQuantity/${productId}`;
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (response.ok) {
        console.log(json);
      }
    }
  };

  const handlePurchase = async () => {
    for (const product of productDetails) {
      await handlePayment(product);
    }
    setAuthenticated(true);
    navigate('/khaltiPayment');
  };

  return (
    <div className="container">
      {productDetails.map((product) => (
        <div className="card my-2" style={{ border: '2px solid' }} key={product._id}>
          
          <h3 className="mx-2">Product Name: {product.name}</h3>
          <strong className="mx-2">Quantity: {product.quantity}</strong>
          <strong className="mx-2">Total price: Rs {product.price * product.quantity}</strong>
        </div>
      ))}
      <div style={{ textAlign: 'right', paddingRight: '20px' }}>
        <button className="btn btn-success" onClick={handlePurchase} style={{ width: '200px' }}>
          Proceed to payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;