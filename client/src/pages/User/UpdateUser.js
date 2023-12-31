import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
    const navigate= useNavigate('');
    const {id}= useParams();
    const[role, setRole]= useState('');
    const[error, setError]= useState('');

    useEffect(() => {
        const fetchUser= async() => {
            try{
                const url= `http://localhost:4000/api/hawa/displaySingleUser/${id}`;
                const response= await fetch(url);
                if(!response.ok){
                    setError( 'Unable to fetch user');
                }
                const data= await response.json();
                setRole(data.role);

            }
            catch(err){
                console.log(err);
            }
        }
        fetchUser();
    }, [id]);

    const handleSubmit= async(e) => {
        e.preventDefault();
        const userData={role};
        const response=await fetch(`http://localhost:4000/api/hawa/updateUser/${id}`,{
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
          setRole('');
          navigate('/displayUser');
        }
    }
  return (
<>
    <div className="container my-3">
    <div className='d-flex justify-content-center'>
    <form onSubmit={handleSubmit}>
    <label><h2> Role </h2></label><br/>
    <select value={role} onChange={(e) => {setRole(e.target.value);}}              
            style={{ width: '300px' }}
            >
              <option value="" disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="staff">Staff</option>

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

export default UpdateUser;