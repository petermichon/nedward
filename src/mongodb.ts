import { MongoClient } from 'mongodb';

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
// await client.connect();

{
  const database = client.db('nedward');
  const collection = database.collection('nedward');

  // collection.insertOne({ name: 'nedward' })

  const result = await collection.findOne({ name: 'nedward' });
  console.log(result);

  await client.close();
}
