import { MongoClient } from 'mongodb';

// curl ipinfo.io/ip

// @ts-ignore
const username = Deno.env.get('USERNAME');
// @ts-ignore
const password = Deno.env.get('PASSWORD');

const uri =
  'mongodb+srv://' +
  username +
  ':' +
  password +
  '@mongodb-6b6196f2-ofefd96f7.database.cloud.ovh.net/admin?replicaSet=replicaset&tls=true';

async function connect() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

connect();
