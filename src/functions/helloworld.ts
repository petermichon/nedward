function helloworld() {
  const text: string = 'Hello, World!';
  return text;
}

{
  const params = JSON.parse(Deno.args[0]);

  console.log(JSON.stringify(helloworld()));
}
