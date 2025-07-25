import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';

const app = new Hono();

// The file path functions/api/[[path]].ts handles the /api part.
// Hono only needs to handle the rest of the path.
app.get('/api/hello', (c) => {
  return c.json({
    message: 'solution',
  });
});

app.get('/api/my-element.js', (c) => {
  return c.text(`
      class MyElement extends HTMLElement {
        connectedCallback() {
          this.innerHTML = "<p style='color: limegreen;'>Hi from Web Component 🎉</p>";
        }
      }
      customElements.define('my-element', MyElement);
    `, 200, {
      'Content-Type': 'application/javascript; charset=utf-8',
    })
})

export const onRequest = handle(app);
