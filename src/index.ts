import { MongoClient } from 'mongodb';
import { username, password } from './credentials.ts';

// curl ipinfo.io/ip

const uri =
  'mongodb+srv://' +
  username +
  ':' +
  password +
  '@mongodb-6b6196f2-ofefd96f7.database.cloud.ovh.net/admin?replicaSet=replicaset&tls=true';

const client = new MongoClient(uri);
await client.connect();

const database = client.db('nedward');
const collection = database.collection('nedward');

async function set() {
  await collection.insertOne({ name: 'nedward' });
}

async function get() {
  const result = await collection.findOne({ name: 'nedward' });
  console.log(result);
}

// await set();
await get();

await client.close();
