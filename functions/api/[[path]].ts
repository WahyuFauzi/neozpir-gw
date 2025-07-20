import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';

const app = new Hono();

// The file path functions/api/[[path]].ts handles the /api part.
// Hono only needs to handle the rest of the path.
app.get('/api/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!',
  });
});

export const onRequest = handle(app);
