import mongoose from 'mongoose';

//const MONGODB_URI = process.env.MONGODB_URL;
const MONGODB_URI = 'mongodb+srv://sujithyadav998:9393038264@cluster2.abpwdpy.mongodb.net/s'



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
    console.log(MONGODB_URI) 
    await mongoose.connect(MONGODB_URI, {  });
}
