import { createClient, getAppApiKeys, getMe, getMongodb } from './ovh.ts';

export default function main() {
  // @ts-ignore
  const APP_KEY = Deno.env.get('APP_KEY');
  // @ts-ignore
  const APP_SECRET = Deno.env.get('APP_SECRET');
  // @ts-ignore
  const CONSUMER_KEY = Deno.env.get('CONSUMER_KEY');

  const credentials = {
    appKey: APP_KEY,
    appSecret: APP_SECRET,
    consumerKey: CONSUMER_KEY,
  };
  const client = createClient(credentials);

  {
    const promise = getMe(client);
    promise
      .then(function (response) {
        console.log(response.firstname);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  {
    const promise = getAppApiKeys(client);
    promise
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  {
    // TestProject
    const serviceName = 'c72b585f83fe4c8bab172e1cb7927dd6';

    const promise = getMongodb(client, serviceName);
    promise
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
}
