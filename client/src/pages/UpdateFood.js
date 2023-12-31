import React, { useState,useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom';


 const UpdateFood = () => {
    const[name,setName]=useState('');
    const[description,setDescription]=useState('');
    const[price,setPrice]=useState('');
    const[time,setTime]=useState('');
    const[status,setStatus]=useState('');
    const[error,setError]=useState('');
    const{id}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchFood=async()=>{
            try{
                const url=`http://localhost:4000/api/hawa/displayFood/${id}`;
               
                const response =await fetch(url);
                if(!response.ok){
                    throw new Error('Unable to fetch food');
                }
                const data=await response.json();
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setTime(data.time);
                setStatus(data.status);

            }
            catch(error){
                setError(error.message);

            }
        }
        fetchFood();

    },[id])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const food={name,description,price,time,status};
        const url=`http://localhost:4000/api/hawa/updateFood/${id}`;
        const response=await fetch(url,{
            method:'PATCH',
            body:JSON.stringify(food),
            headers:{
                'Content-Type':'application/json'
            }

        })
        const json=await response.json();
        if(!response.ok){
            setError(json.error)
        }
        else{
            console.log(food)
            setName('');
            setDescription('');
            setPrice('');
            setTime('');
            setStatus('');
            navigate('/');
        }
        
    }
    
  return (
    <>
    <div className="container">
        <form onSubmit={handleSubmit}>
            <label>name</label><br />
            <input type="text" onChange={(e)=>{setName(e.target.value)}}value={name}/><br />
            <label>Description</label><br />
            <input type="text" onChange={(e)=>{setDescription(e.target.value)}} value={description}/><br />
            <label>Price</label><br />
            <input type="text" onChange={(e)=>{setPrice(e.target.value)}} value={price}/><br />
            <label>Estimated time</label><br />
            <input type="text" onChange={(e)=>{setTime(e.target.value)}} value={time}/><br />
            <label>Status</label><br />
            <input type="text" onChange={(e)=>{setStatus(e.target.value)}} value={status}/><br />
            <button className='btn btn-primary my-2'>Update</button>
        </form>
        {error && <div>{error}</div>}
    </div>
    </>

  )
}
 export default UpdateFood;
