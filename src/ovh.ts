import createOvh from '@ovhcloud/node-ovh';

type Client = any;

type Credentials = {
  appKey: string;
  appSecret: string;
  consumerKey: string;
};

export function createClient(creds: Credentials): Client {
  const client = createOvh(creds);
  return client;
}

// Get account informations
// GET /me
export function getMe(c: Client): Promise<any> {
  const method = 'GET';
  const path = '/me';
  const promise = c.requestPromised(method, path);
  return promise;
}

// List API Keys
// GET /me/api/application
// https://www.ovh.com/auth/api/createToken
export function getAppApiKeys(c: Client): Promise<any> {
  const method = 'GET';
  const path = '/me/api/application';
  const promise = c.requestPromised(method, path);
  return promise;
}

// List MongoDB databases
// GET /cloud/project/{serviceName}/database/mongodb
export function getMongodb(c: Client, serviceName: string): Promise<any> {
  const method = 'GET';
  const path = '/cloud/project/' + serviceName + '/database/mongodb';
  const promise = c.requestPromised(method, path);
  return promise;
}
