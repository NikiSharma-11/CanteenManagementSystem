import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateOrder = () => {
    const navigate= useNavigate('');
    const {id}= useParams();
    const[status, setStatus]= useState('');
    const[userId, setUserId]= useState('');
    const[error, setError]= useState('');

    useEffect(() => {
        const fetchUser= async() => {
            try{
                const url= `http://localhost:4000/api/hawa/displaySingleCart/${id}`;
                const response= await fetch(url);
                if(!response.ok){
                    setError( 'Unable to fetch user');
                }
                const data= await response.json();
                setStatus(data.status);
                setUserId(data.userId);

            }
            catch(err){
                console.log(err);
            }
        }
        fetchUser();
    }, [id]);

    const handleSubmit= async(e) => {
        e.preventDefault();
        try{
          const userData={status};
          const response=await fetch(`http://localhost:4000/api/hawa/updateCartInfo/${id}`,{
            method:'PATCH',
            body:JSON.stringify(userData),
            headers:{
              'Content-Type':'application/json'
            }
          });
          const json=await response.json();
          if(!response.ok){
            setError(json.error);
          }
          else{
            setStatus('');
            navigate('/orders');
          }
      }
      catch(err){
        console.log(err);
      }

      const userData={status,userId};
          const response=await fetch(`http://localhost:4000/api/hawa/addUserNoti`,{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{
              'Content-Type':'application/json'
            }
          });
          const json=await response.json();
          if(!response.ok){
            setError(json.error);
          }
         

        }

       
  return (
<>
    <div className="container my-3">
    <div className='d-flex justify-content-center'>
    <form onSubmit={handleSubmit}>
    <label><h2> Status </h2></label><br/>
    <select value={status} onChange={(e) => {setStatus(e.target.value);}}              
            style={{ width: '300px' }}
            >
              <option value="" disabled>Select Status</option>
              <option value="preperation">Preperation</option>
              <option value="cooking">Cooking</option>
              <option value="ready">Ready</option>

    </select>
    <div className='d-flex justify-content-center'>
    <button className="btn btn-success my-1"> Update </button>
    </div>

    </form>
    <div>
        {error && <div className='text-danger'> {error} </div>}
    </div>
    </div>
    </div>
    </>
  )
}

export default UpdateOrder;