{
  const result = await add(3, 5);
  console.log(result);
}
{
  const result = await add(8, 12);
  console.log(result);
}

async function add(a: number, b: number): Promise<number> {
  const url = `http://localhost:8000`;
  const route = `/add/${a}/${b}`;

  const response = await fetch(url + route);

  const result = Number(await response.text());

  return result;
}
