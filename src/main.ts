import createOvh from '@ovhcloud/node-ovh';

export default function main() {
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

  ovh.request('GET', '/me', function (err, me) {
    console.log(err || 'Welcome ' + me.firstname);
  });
}
