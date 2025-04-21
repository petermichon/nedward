import createOvh from '@ovhcloud/node-ovh';

function login(): any {
  // @ts-ignore
  const APP_KEY = Deno.env.get('APP_KEY');
  // @ts-ignore
  const APP_SECRET = Deno.env.get('APP_SECRET');
  // @ts-ignore
  const CONSUMER_KEY = Deno.env.get('CONSUMER_KEY');

  // console.log(APP_KEY);
  // console.log(APP_SECRET);
  // console.log(CONSUMER_KEY);

  const ovh = createOvh({
    appKey: APP_KEY,
    appSecret: APP_SECRET,
    consumerKey: CONSUMER_KEY,
  });

  return ovh;
}

export async function ovhConnect(): Promise<any> {
  const ovh = login();

  // ovh.request('GET', '/me', function (err, me) {
  //   console.log(err || 'Welcome ' + me.firstname);
  // });

  const promise = ovh.requestPromised('GET', '/me');

  return promise;
}

export async function ovhQuery(): Promise<void> {
  const ovh = login();

  /*ovh.request('GET', '/me/api/application', function (err, app) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(app);
  });*/

  const method = 'GET';
  const path = '/me/api/application';
  const promise = ovh.requestPromised(method, path);

  return promise;
}
