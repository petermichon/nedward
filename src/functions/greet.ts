function greet(name1: string, name2: string) {
  const text: string = `Hello, ${name1} and ${name2}!`;
  return text;
}

{
  type Params = { name1: string; name2: string };

  const params: Params = JSON.parse(Deno.args[0]);

  const name1 = params.name1;
  const name2 = params.name2;

  console.log(JSON.stringify(greet(name1, name2)));
}
