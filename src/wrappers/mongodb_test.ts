import {
  createClient,
  getAppApiKeys,
  getClustersProperties,
  getMe,
  listMongodbs,
} from './ovh.ts';

function mongo() {
  const APP_KEY = Deno.env.get('APP_KEY') as string;
  const APP_SECRET = Deno.env.get('APP_SECRET') as string;
  const CONSUMER_KEY = Deno.env.get('CONSUMER_KEY') as string;

  const credentials = {
    appKey: APP_KEY,
    appSecret: APP_SECRET,
    consumerKey: CONSUMER_KEY,
  };
  const client = createClient(credentials);

  // TestProject
  const serviceName = 'c72b585f83fe4c8bab172e1cb7927dd6';

  // MongoDB
  const clusterId = '6b6196f2-ebba-4b65-9869-e762f0b2abe9';

  {
    getMe(client)
      .then(function (response) {
        console.log('1:', response.firstname);
      })
      .catch(function (error) {
        console.log('1:', error.message);
      });
  }

  {
    getAppApiKeys(client)
      .then(function (response) {
        console.log('2:', response);
      })
      .catch(function (error) {
        console.log('2:', error.message);
      });
  }

  {
    listMongodbs(client, serviceName)
      .then(function (response) {
        console.log('3:', response);
      })
      .catch(function (error) {
        console.log('3:', error.message);
      });
  }

  {
    getClustersProperties(client, serviceName, clusterId)
      .then(function (response: any) {
        const description = response.description;
        const engine = response.engine;
        const plan = response.plan;
        const storage = response.storage.size.value;
        const unit = response.storage.size.unit;
        const status = response.status;
        console.log('4:', description, engine, plan, storage, unit, status);
      })
      .catch(function (error: any) {
        console.log('4:', error.message);
      });
  }

  {
    // ...
  }
}
