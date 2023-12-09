import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://sujithyadav998:9393038264@cluster2.abpwdpy.mongodb.net/s';


let alreadyDone = false;

export async function dbConnect() {
    if (alreadyDone) {
        return;
    }
    alreadyDone = true;
    await mongoose.connect(MONGODB_URI, {  });
}
