import { Application, Router } from 'jsr:@oak/oak/';

const app = new Application();
const router = new Router();

// register routes
router.get('/add/:a/:b', (context) => {
  const a = Number(context.params.a);
  const b = Number(context.params.b);
  const result = add(a, b);
  context.response.body = result;
});

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8000 });

function add(a: number, b: number): number {
  return a + b;
}
