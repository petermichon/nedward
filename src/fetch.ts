{
  // const url = 'https://nedward.eu/api/@nedward/hotel.svg';
  // const url = 'http://localhost:3000/@nedward/hotel.svg';
  const url = 'http://localhost:3000/@nedward/helloworld.txt';
  const response = await fetch(url);
  const body = await response.text();
  console.log(body);
}
