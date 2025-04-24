import { MongoClient, WithId, Document } from 'mongodb';

// curl ipinfo.io/ip

function mongoTests() {
  {
    const p = mongoConnect();

    p.then(function (response) {
      console.log('Connected successfully to MongoDB');
    }).catch(function (error) {
      console.log('Unable to connect to MongoDB:', error.message);
    });
  }

  {
    const result = mongoQuery();

    result.then(function (response) {
      console.log(response?.name);
    });
  }
}

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

export async function mongoConnect(): Promise<MongoClient> {
  const client = login();

  const result = client.connect();

  await client.close();

  return result;
}

export async function mongoQuery(): Promise<WithId<Document> | null> {
  const client = login();
  // await client.connect();

  const database = client.db('nedward');
  const collection = database.collection('nedward');

  // collection.insertOne({ name: 'nedward' })

  const result = await collection.findOne({ name: 'nedward' });

  await client.close();

  return result;
}
