function helloworld() {
  const text: string = 'Hello, World!';
  return text;
}

{
  // @ts-ignore
  const params = JSON.parse(Deno.args);

  console.log(JSON.stringify(helloworld()));
}
