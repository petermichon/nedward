function greet(name1: string, name2: string) {
  const text: string = `Hello, ${name1} and ${name2}!`;
  return text;
}

{
  const name1: string = Deno.args[0];
  const name2: string = Deno.args[1];
  console.log(greet(name1, name2));
}
