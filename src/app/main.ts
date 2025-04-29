import {
  createClient,
  getAppApiKeys,
  getClustersProperties,
  getMe,
  listMongodbs,
} from './ovh.ts';

export default function main() {
  {
    const path = './functions/';
    const filename = 'helloworld.ts';

    const content = `
      function helloworld() {
        return 'Hello World!';
      }

      helloworld();
    `;

    // Deno.writeTextFileSync(path + filename, content);
  }

  {
    const path = './functions/';
    const filename = 'helloworld.ts';
    const params = '{}';

    const resp = runDeno(path + filename, params);

    resp.then((resp) => {
      const output = resp.output;
      const error = resp.error;

      console.log(output);
      if (error) {
        console.error(error);
      }
    });
  }

  {
    const path = './functions/';
    const filename = 'greet.ts';
    const params = '{"name1":"Alice", "name2":"Bob"}';

    const resp = runDeno(path + filename, params);

    resp.then((resp) => {
      const output = resp.output;
      const error = resp.error;

      console.log(output);
      if (error) {
        console.error(error);
      }
    });
  }
}

interface Response {
  output: string;
  error: string;
}

async function runDeno(path: string, params: string): Promise<Response> {
  const command = new Deno.Command(Deno.execPath(), {
    args: ['run', path, params],
    stdin: 'piped',
    stdout: 'piped',
    stderr: 'piped',
  });

  const { stdin, stdout, stderr } = command.spawn();

  const out = await stdout.getReader().read();
  const err = await stderr.getReader().read();

  const outDecoded = new TextDecoder().decode(out.value);
  const errDecoded = new TextDecoder().decode(err.value);

  const resp: Response = { output: outDecoded, error: errDecoded };

  return resp;
}

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
