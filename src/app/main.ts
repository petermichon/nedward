import { denoRun } from './denoRun.ts';
import { injectCall } from './injectCall.ts';

export default function main() {
  {
    const func = { name: 'hello' };
    const files = {
      source: {
        path: './functions/' + func.name + '.txt',
        content: '',
      },
      dest: {
        path: './functions/' + func.name + '.ts',
        content: '',
      },
    };
    const call = { name: func.name, args: [] };

    files.source.content = Deno.readTextFileSync(files.source.path);

    files.dest.content = injectCall(files.source.content, call);

    Deno.writeTextFileSync(files.dest.path, files.dest.content);
  }

  {
    const func = { name: 'greet' };
    const files = {
      source: {
        path: './functions/' + func.name + '.txt',
        content: '',
      },
      dest: {
        path: './functions/' + func.name + '.ts',
        content: '',
      },
    };
    const call = {
      name: func.name,
      args: [
        { name: 'name1', type: 'string' },
        { name: 'name2', type: 'string' },
      ],
    };

    files.source.content = Deno.readTextFileSync(files.source.path);

    files.dest.content = injectCall(files.source.content, call);

    Deno.writeTextFileSync(files.dest.path, files.dest.content);
  }

  {
    const path = './functions/';
    const filename = 'hello.ts';
    // const params = '{}';
    const params: string[] = [];

    const resp = denoRun(path + filename, params);

    resp.then((resp) => {
      const output = resp.output;
      const error = resp.error;

      console.log('RESPONSE :', output);
      if (error) {
        console.error(error);
      }
    });
  }

  {
    const path = './functions/';
    const filename = 'greet.ts';
    const params = ['Alice', 'Bob'];

    const resp = denoRun(path + filename, params);

    resp.then((resp) => {
      const output = resp.output;
      const error = resp.error;

      console.log('RESPONSE :', output);
      if (error) {
        console.error(error);
      }
    });
  }
}
