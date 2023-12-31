import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

 const AddFood = () => {
    const navigate=useNavigate();
    const[name,setName]=useState('');
    const[description,setDescription]=useState('');
    const[price,setPrice]=useState('');
    const[image,setImage]=useState('');
    const[time,setTime]=useState('');
    const[status,setStatus]=useState('');
    const[error,setError]=useState('');
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('name',name);
        formData.append('description',description);
        formData.append('price',price);
        formData.append('time',time);
        formData.append('status',status);
        formData.append('image',image);
        
        const response=await fetch('http://localhost:4000/api/hawa/AddFood',{
            method: 'POST',
            body:formData
        });

        const json=await response.json();
        if(!response.ok){
            const{errors}=json;
            setError(errors.join(','));
        }
        else{
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
    <div className='container'>
        <h1>Add Food</h1>
        <form onSubmit={handleSubmit}>
            <label>Name</label><br />
            <input type="text" onChange={(e)=>{setName(e.target.value)}}value={name}/><br />
            <label>Description</label><br />
            <input type="text" onChange={(e)=>{setDescription(e.target.value)}}value={description}/><br />
            <label>Price</label><br />
            <input type="text" onChange={(e)=>{setPrice(e.target.value)}}value={price}/><br />
            <label>Estimated Time</label><br />
            <input type="text" onChange={(e)=>{setTime(e.target.value)}}value={time}/><br />
            <label>Status</label><br />
            <input type="text" onChange={(e)=>{setStatus(e.target.value)}}value={status}/><br />
            <label><h6>Add Image</h6></label>
            <input type="file" className='form-control'onChange={(e)=>{setImage(e.target.files[0])}}/><br />
            <button className="btn btn-primary  my-3">Add Food</button>

        </form>
        {error && <div className='text-danger'>{error}</div>}
    </div>
    </>
  )
}

export default AddFood