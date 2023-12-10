import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URL;


let alreadyDone = false;

export async function dbConnect() {
    if (alreadyDone) {
        return;
    }
    if (!MONGODB_URI) {
        console.error('MongoDB URL is not defined in the environment variables.');
        process.exit(1);
      }
    
    alreadyDone = true;
    await mongoose.connect(MONGODB_URI, {  });
}
