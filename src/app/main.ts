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
