import { MongoClient } from 'mongodb';

// curl ipinfo.io/ip

function login(): MongoClient {
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

  const client = new MongoClient(uri);

  return client;
}

export async function mongoConnect() {
  const client = login();

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

export async function mongoQuery() {
  const client = login();
  // await client.connect();

  const database = client.db('nedward');
  const collection = database.collection('nedward');

  // collection.insertOne({ name: 'nedward' })

  const result = await collection.findOne({ name: 'nedward' });
  console.log(result);

  await client.close();
}
