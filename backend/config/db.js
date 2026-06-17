const { MongoClient, ServerApiVersion } = require("mongodb");

let db;
let client;

const connectDB = async () => {
  try {
    client = new MongoClient(process.env.MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    db = client.db(process.env.DB_NAME);

    await db.command({ ping: 1 });

    console.log("MongoDB Connected Successfully");
    console.log(`Database: ${process.env.DB_NAME}`);

    return db;
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
};

const closeDB = async () => {
  if (client) {
    await client.close();
    console.log("MongoDB Connection Closed");
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB,
};