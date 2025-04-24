/* Wrapper functions for OVHcloud API */

import createOvh from '@ovhcloud/node-ovh';

type Client = any;

type Credentials = {
  appKey: string;
  appSecret: string;
  consumerKey: string;
};

export function createClient(creds: Credentials): Client {
  const client = createOvh({
    appKey: creds.appKey,
    appSecret: creds.appSecret,
    consumerKey: creds.consumerKey,
    endpoint: 'ovh-eu',
  });
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

// GET /me/api/application
// https://www.ovh.com/auth/api/createToken
export function getAppApiKeys(c: Client): Promise<any> {
  const method = 'GET';
  const path = '/me/api/application';
  const promise = c.requestPromised(method, path);
  return promise;
}

// List mongodbs of the project
// GET /cloud/project/{serviceName}/database/mongodb
export function listMongodbs(c: Client, serviceName: string): Promise<any> {
  const method = 'GET';
  const path = '/cloud/project/' + serviceName + '/database/mongodb';
  const promise = c.requestPromised(method, path);
  return promise;
}

// --- MongoDB

// Get mongodb cluster properties
// GET /cloud/project/{serviceName}/database/mongodb/{clusterId}
export function getClustersProperties(
  c: Client,
  serviceName: string,
  clusterId: string
) {
  const method = 'GET';
  const path =
    '/cloud/project/' + serviceName + '/database/mongodb/' + clusterId;
  const promise = c.requestPromised(method, path);
  return promise;
}

//
//
export function __(c: Client, serviceName: string) {
  // ...
}

//
//
export function ___(c: Client, serviceName: string) {
  // ...
}
