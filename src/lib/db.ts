import { MongoClient, Db } from 'mongodb';

// 1. Declare the type for the client (MongoClient)
// We'll use a type assertion to tell TypeScript that it will be initialized later.
let _client: MongoClient | null = null;
let _db: Db | null = null;

/**
 * Initializes the MongoDB connection.
 * @returns A Promise that resolves to the MongoClient instance.
 */

export async function initDb(): Promise<MongoClient> {
    if(_client && _db) {
        console.log('DB is already initialized');
        return _client;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI enviroment variable is not set.');
    }

    try {
        const client = await MongoClient.connect(uri);
        _client = client;

        _db = client.db();

        console.log('Successfully connected to MongoDB!');

        return _client;
    } catch(err) {
        console.error('Failed to connect to MongoDB: ', err);
        throw err;
    }
}

/**
 * Gets the connected MongoDB Database instance.
 * @returns The MongoDB Db instance.
 */

export function getDb(): Db {
    if(!_db) {
        throw new Error('Db not initialized! Call initDb() first.');
    }

    //We assert the type here because we check for null above
    return _db as Db;
}

/**
 * Gets the connected MongoDB Client instance.
 * @returns The MongoDB MongoClient instance.
 */

export function getClient(): MongoClient {
    if (!_client) {
        throw new Error('Client not initialized! Call initDb() first.');
    }
    return _client as MongoClient;
}


// let _db;

// export function initDb(callback) {
//     if (_db) {
//         console.log('DB is already initialized!');
//         return callback(null, _db);
//     }

//     MongoClient.connect(process.env.MONGODB_URI)
//     .then((client) => {
//         _db = client;
//         callback(null, _db);
//     })
//     .catch((err) => {
//         callback(err);
//     });
// };

// export function getDb() {
//     if(!_db) {
//         throw Error('Db not initialized!');
//     }
//     return _db;
// };


