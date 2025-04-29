function greet(name1: string, name2: string) {
  const text: string = `Hello, ${name1} and ${name2}!`;
  return text;
}

{
  // @ts-ignore
  const params = JSON.parse(Deno.args);

  const name1 = params.name1;
  const name2 = params.name2;

  console.log(JSON.stringify(greet(name1, name2)));
}
