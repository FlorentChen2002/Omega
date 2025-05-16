// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = "PremierBD";

async function connectToDB() {
    const client = new MongoClient(uri, { connectTimeoutMS: 5000 });
    try {
      await client.connect();
      console.log('Connecté à MongoDB');
      const db = client.db(dbName);
      return db;
    } catch (error) {
      console.error('Erreur de connexion à MongoDB :', error.message);
      process.exit(1);
    }
  }
  
module.exports = connectToDB