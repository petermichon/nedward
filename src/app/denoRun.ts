interface Response {
  output: string;
  error: string;
}

export async function denoRun(
  path: string,
  params: string[]
): Promise<Response> {
  const command = new Deno.Command(Deno.execPath(), {
    // '--allow-read=./functions/hello.ts'
    args: ['run', path, ...params],
    stdout: 'piped',
    stderr: 'piped',
  });

  const { stdout, stderr } = command.spawn();

  const out = await stdout.getReader().read();
  const err = await stderr.getReader().read();

  const outDecoded = new TextDecoder().decode(out.value);
  const errDecoded = new TextDecoder().decode(err.value);

  const resp: Response = { output: outDecoded, error: errDecoded };

  return resp;
}
