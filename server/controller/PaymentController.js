import axios from 'axios'
import Payment from "../models/PaymentSchema.js";

 //Route 1: Khalti payment
export const KhaltiPayment = async (req, res) => {
    const khaltiUrl = 'https://a.khalti.com/api/v2/epayment/initiate/';
    const headers = {
      Authorization: 'Key e53ffb1e15a443ce8c65cfb95e0037e8',
    };
  
    try {
      const response = await axios.post(khaltiUrl, req.body, { headers });
      res.json({ khaltiUrl: response.data.payment_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
};

//Route 2: Record a payment

export const addPayment=async(req,res)=>{
    const{userId,status,username,productId,productName,productPrice,quantity}=req.body;
    try{
        const payment=await Payment.create({userId,status,username,productId,productName,productPrice,quantity});
        res.status(200).json(payment)
    }catch(error){
      res.status(400).json({error:error.message})
    }
}

//Route 3: Display a payment
export const displayPayment=async(req,res)=>{
    const payment=await Payment.find({});
    res.status(200).json(payment);
}

//Update Payment
export const updatePayment=async(req,res)=>{
    const {id}=req.params;
    const payment=await Payment.findOneAndUpdate({_id:id},{...req.body});
    res.status(200).json(payment);
}

// display single payment
export const displaySinglePayment=async(req,res)=>{
    const {id}=req.params;

    const payment=await Payment.findById(id);
    res.status(200).json(payment);
}

//Route 5: update payment quantity
export const updatePaymentQuantity=async(req,res)=>{
  const {id}=req.params;
 
  const payment=await Payment.findOneAndUpdate({productId:id},{...req.body});
  res.status(200).json(payment);
}