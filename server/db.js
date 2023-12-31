// Importing the mongoose module for MongoDB connectivity

import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

// The URI for connecting to the MongoDB database

const mongoURI = process.env.MONGOURI;


const connectDB = () => {

 try {

// Connecting to the MongoDB database using the provided URI

mongoose.connect(mongoURI);
console.log("Connected to database successfully");
 } catch (error) {

 console.log("Internal error occurred", error);
 }

};

// Exporting the connectDB function to be used in other parts of the code

export default connectDB;




