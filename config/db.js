const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const closeDB = async () => {
    await mongoose.connection.close()
}

const cleanDB = async () => {
    const collections = await mongoose.connection.listCollections();
    const collectionsNames = collections.map(collection => collection.name);
    collectionsNames.forEach(collectionName => {
        mongoose.connection.dropCollection(collectionName)
    });
}

module.exports = {connectDB, closeDB, cleanDB};