import mongoose from "mongoose";

async function connectMongoose() {
    const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER}/${process.env.DB}?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URI);
        console.log("connected to db");
    } catch (error) {
        console.error(error.message);
    }
}

export {connectMongoose}