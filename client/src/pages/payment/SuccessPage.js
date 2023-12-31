import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';


const SuccessPage = () => {
  const { userId, setAuthenticated,username } = useContext(AuthContext);
  const [paymentIds, setPaymentIds] = useState([]);
  const [bill, setBill] = useState([]);

  useEffect(() => {
    const url = `http://localhost:4000/api/hawa/displayPayment`;
    const displayPayment = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          setAuthenticated(true);
          const data = await response.json();
          const userPayments = data.filter(item => item.userId === userId);
          if(userPayments){
            setBill(userPayments);
          }
          const ids = userPayments.map(payment => payment._id);
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
console.log(bill);
  useEffect(() => {
    if (paymentIds.length > 0) {
      const status = 'success';
      const updatePayments = async () => {
        try {
          const updatePromises = paymentIds.map(id => {
            const url = `http://localhost:4000/api/hawa/updatePayment/${id}`;
            return fetch(url, {
              method: 'PATCH',
              body: JSON.stringify({ status }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
          });

          const responses = await Promise.all(updatePromises);
          const results = await Promise.all(responses.map(response => response.json()));

          results.forEach((result, index) => {
            if (responses[index].ok) {
              console.log(`Payment ${paymentIds[index]} status updated to success`, result);
            } else {
              console.error(`Error updating payment ${paymentIds[index]} status`);
            }
          });
        } catch (error) {
          console.error('Error updating payment status:', error);
        }
      };
      updatePayments();
    }
  }, [paymentIds]);

 
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <>
     <div className="row text-center"><h1>Your Receipt</h1>r</div>
       <div className="container">
        {bill && bill.map((info)=>(
          <div className="row">
          <div className="card" style={{border:'2px solid black'}}>
          <div className="border-top-2"></div>
            <div className="row">
              <div className="col mx-2"><b>Bill no: {info._id}</b></div>
              <div className="col" style={{ textAlign: 'right', marginRight:'100px' }}>
              <b>Date: {currentDate}</b>
              </div>
            </div>
            <div className="row">
              <div className="col  text-center">
              <b>NCC FOODS</b><br />
              <b>Minbhawan, Kathmandu</b>
              </div>
            </div>
            <div className="row"  style={{borderBottom:'2px solid black'}}>
              <div className="col mx-2">
                <b>Username :{username}</b><br />
                <b>Product: {info.productName}</b><br />
              </div>
            </div>
            <div className="row" >
            <div className="col text-center" style={{borderRight:'2px solid black'}}>
              <b>SN</b><br />
              <b>1</b>
            </div>
            <div className="col text-center" style={{borderRight:'2px solid black'}}>
              <b>Particulars(Product Name)</b><br />
              <b>{info.productName}</b>
            </div>
            <div className="col text-center">
              <b>Amount(Rs)</b><br />
              <b>{info.productPrice}</b>
            </div>
          </div>
         <div>
         <div className="row" style={{borderTop:'2px solid black'}}>
            <div className="col" style={{ textAlign: 'right', marginRight:'165px' }} >
              <b>Grand Total:Rs {info.productPrice} </b>
            </div>
          </div>
         </div>
        </div>
        </div> 
        ))}
       </div>
    </>
  );
};

export default SuccessPage;