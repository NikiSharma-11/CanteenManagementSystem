import User from '../models/UserSchema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config(); //use gareko

// Route 1 send signUp data to database
export const userSignUp = async(req, res)=>{
    const{username,email,password,role}= req.body; //desturucture gareko username email ra password send garnalai
    try{
        const saltRound = 10; //10 ota word add gardine
        const salt = await bcrypt.genSalt(saltRound); //salt ma bhako 10 ota word generate gardine
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.findOne({email});  //yauta matra username use garna paune
        if(user){
          return res.status(400).json({errors: ["Email already exists, Please login to continue"]})
        }
        //create and return JWT token
        const accessToken=jwt.sign({userId:User._id},process.env.SECRET,{expiresIn:"1d"})
        const userData = await User.create({username, email, hashPassword,role, accessToken})
        
        res.status(200).json({data:userData,accessToken}); //response ma token matra pathauna
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
 //Route 2 Login system
 export const userLogIn = async(req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      // Compare the provided password
      const passwordValid = await bcrypt.compare(password, user.hashPassword);
      if (!passwordValid) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      // Create and return JWT token
      const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET,{expiresIn:"1d"});
      await User.findByIdAndUpdate(user._id,{accessToken})
      res.status(200).json({
        data:{email:user.email,
        role:user.role},
        accessToken
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

//Route 3
  export const checkLogin=(req, res)=>{
  const userRole=req.userRole;
  const userId=req.userId;
  const username=req.username;
  res.status(200).json({userRole,userId,username});
  }

  //Route 4: Display all user
  export const displayAllUser=async(req,res)=>{
    try{
      const user=await User.find({});
      res.status(200).json(user);
    }catch(error){
      res.status(500).json({msg:"Internal server error"})
    }
  }

  //Route 5: Display single user
  export const displaySingleUser=async(req,res)=>{
    const {id}=req.params;
    try{
      const user=await User.findById(id);
      res.status(200).json(user);
    }catch(error){
      res.status(500).json({msg:"Internal server error"})
    }
  } 

  //Route 6: Delete a user
  export const deleteUser=async(req,res)=>{
    const {id}=req.params;
    try{
      const user=await User.findOneAndDelete({_id:id});
      res.status(200).json(user);
    }catch(error){
      res.status(500).json({msg:"Internal server error"})
    }
  }

  //Route 7: Update a user
  export const updateUser=async(req,res)=>{
    const{id}=req.params;
    try{
      const user=await User.findOneAndUpdate({_id:id},{...req.body});
      res.status(200).json(user);
    }catch(error){
      res.status(500).json({msg:"Internal server error"})
    }
  }