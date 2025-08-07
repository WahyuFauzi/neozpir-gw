import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import shopifyProductsEn from "./ecommerce/shopify-plans.en.json"
import shopifyProductsId from "./ecommerce/shopify-plans.id.json"
import enterpriseProductsEn from "./ecommerce/enterprise-plans.en.json"
import enterpriseProductsId from "./ecommerce/enterprise-plans.id.json"
import automationProductsEn from "./ecommerce/automation-plans.en.json"
import automationProductsId from "./ecommerce/automation-plans.id.json"
import { marked } from 'marked';

const app = new Hono();

const getBlogContent = async () => {
  const markdown = `# Aduh Gantengnya \n Jangan marah Azril \n \`\`\`javascript \n console.log("Aduh hitamnya"); \n\`\`\``;
  return marked(markdown);
};

app.get('/api/product/:product', async (c) => {
  const product = c.req.param('product')
  const langKey = c.req.query('langKey')
  switch (langKey) {
    case 'id-ID':
      if (product == 'shopify') return c.json(shopifyProductsId)
      if (product == 'enterprise') return c.json(enterpriseProductsId)
      if (product == 'automation') return c.json(automationProductsId)
      break
    case 'en-US':
      if (product == 'shopify') return c.json(shopifyProductsEn)
      if (product == 'enterprise') return c.json(enterpriseProductsEn)
      if (product == 'automation') return c.json(automationProductsEn)
    default:
      console.error("Language unknown")
      if (product == 'shopify') return c.json(shopifyProductsEn)
      if (product == 'enterprise') return c.json(enterpriseProductsEn)
      if (product == 'automation') return c.json(automationProductsEn)
  }
})

app.get('/api/blog/:langkey', async (c) => {
  const db = c.env.DB // 👈 grab the D1 binding
  const langkey = c.req.param ('langkey')
  const { results } = await db.prepare(`SELECT * FROM blog WHERE langkey LIKE \"${langkey}\" AND is_publish = 1`).all();
  if (results.length === 0) {
    return c.notFound();
  }
  return c.json(results)
})

app.get('/api/blog/:langkey/:title', async (c) => {
  const db = c.env.DB // 👈 grab the D1 binding
  const langkey = c.req.param ('langkey')
  const title = c.req.param ('title')
  const { results } = await db.prepare(`SELECT * FROM blog WHERE langkey LIKE \"${langkey}\" AND title LIKE \"${title}\" AND is_publish = 1`).all();

  const html = await marked(results[0].content_markdown);
  return new Response(html, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
})

export const onRequest = handle(app);
