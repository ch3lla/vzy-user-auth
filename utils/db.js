import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database');
    } catch (error){
        console.log(`Database failed to connect due to ${error}`);
    }
};

export default connectDB;