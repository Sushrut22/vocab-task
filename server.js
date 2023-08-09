const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

const uri = "mongodb://127.0.0.1:27017"; // Replace with your MongoDB connection URI
const dbName = "vocabularyDB"; // Replace with your database name
const collectionName = "vocabularies"; // Replace with your collection name

// export let vocabData = {};

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB server
client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch data from the collection
    app.get("/api/data", async (req, res) => {
      try {
        const vocabData = await collection.find({}).toArray();
        console.log(vocabData);
        res.json(vocabData);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Close the MongoDB connection when the server is closed
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    process.on("SIGINT", () => {
      console.log("Closing server and MongoDB connection...");
      server.close(() => {
        client.close();
      });
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
