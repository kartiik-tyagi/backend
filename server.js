require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const app = express();
app.use(cors());


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
}
connectDB();


const PORTSERVER = process.env.PORTSERVER || 3040;
const host = process.env.IPAdd || '0.0.0.0';

const dbName = "testDB"; // Change to your DB name
const collectionName = "users"; // Change to your collection name
const dummyData = {
    name: "Rahul singh",
    code: "cse79"
}
// Insert Dummy Data into MongoDB
async function insertDummyData() {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(dummyData);
        console.log("Dummy data inserted:", result.insertedId);
    } catch (err) {
        console.error("Error inserting data", err);
    }
}



// write a code to dummyData this data in database
app.get('/api/hello', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const data = await collection.find({}).toArray();

        res.json({ data: data, message: "Hello, World!", status: 0 });
    } catch (err) {
        console.error("Error fetching data", err);
        res.status(500).json({ message: "Error fetching data", status: 1 });
    }
});

app.listen(PORTSERVER, host, async() => {
    console.log(`Server is running on http://${host}:${PORTSERVER}`);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const count = await collection.countDocuments();
    if (count === 0) {
        await insertDummyData();
    }
});
