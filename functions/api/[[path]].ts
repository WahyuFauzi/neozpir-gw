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
  const markdown = `# Aduh Gantengnya \n Jangan marah Azril \n 
  console.log("Aduh hitamnya"); 
`;
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
  console.log("Attempting to access DB binding...");
  const db = c.env.DB;
  if (!db) {
    console.error("DB binding not found. Check wrangler.toml configuration.");
    return c.text("Database binding not configured", 500);
  }
  console.log("DB binding accessed. Preparing query.");

  const langkey = c.req.param('langkey');
  try {
    console.log(`Executing query for langkey: ${langkey}`);
    const { results } = await db.prepare("SELECT * FROM blog WHERE langkey = ?1 AND is_publish = 1")
      .bind(langkey)
      .all();
    
    console.log(`Query returned ${results.length} results.`);
    if (results.length === 0) {
      return c.notFound();
    }
    return c.json(results);
  } catch (e) {
    console.error("Error executing query for langkey:", e);
    return c.text("Error fetching data", 500);
  }
})

app.get('/api/blog/:langkey/:title', async (c) => {
  console.log("Attempting to access DB binding...");
  const db = c.env.DB;
  if (!db) {
    console.error("DB binding not found. Check wrangler.toml configuration.");
    return c.text("Database binding not configured", 500);
  }
  console.log("DB binding accessed. Preparing query.");

  const langkey = c.req.param('langkey');
  const title = c.req.param('title');
  try {
    console.log(`Executing query for langkey: ${langkey}, title: ${title}`);
    const { results } = await db.prepare("SELECT * FROM blog WHERE langkey = ?1 AND title = ?2 AND is_publish = 1")
      .bind(langkey, title)
      .all();

    console.log(`Query returned ${results ? results.length : 0} results.`);
    if (!results || results.length === 0) {
      return c.notFound();
    }

    const html = await marked(results[0].content_markdown);
    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  } catch (e) {
    console.error("Error executing query for langkey/title:", e);
    return c.text("Error fetching data", 500);
  }
})

export const onRequest = handle(app);