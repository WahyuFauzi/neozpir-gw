import { Hono } from 'hono';
import shopifyProductsEn from "./ecommerce/shopify-plans.en.json"
import shopifyProductsId from "./ecommerce/shopify-plans.id.json"
import enterpriseProductsEn from "./ecommerce/enterprise-plans.en.json"
import enterpriseProductsId from "./ecommerce/enterprise-plans.id.json"
import automationProductsEn from "./ecommerce/automation-plans.en.json"
import automationProductsId from "./ecommerce/automation-plans.id.json"
import { marked } from 'marked';

const app = new Hono();

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
  const db = c.env.BLOG;
  if (!db) {
    console.error("DB binding not found. Check wrangler.toml configuration.");
    return c.text("Database binding not configured", 500);
  }
  console.log("DB binding accessed. Preparing query.");

  const langkey = c.req.param('langkey');
  try {
    console.log(`Executing query for langkey: ${langkey}`);
    const { results } = await db.prepare("SELECT * FROM blog WHERE langkey = ?1 AND is_publish = 1 ORDER BY publish_date DESC")
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
  const db = c.env.BLOG;
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

    const post = results[0];
    const html = await marked(post.content_markdown);

    const responsePayload = {
      html: html,
      titleDisplay: post.title_display,
      author: post.created_by,
      publishDate: post.publish_date,
      category: post.category
    };

    return c.json(responsePayload);
  } catch (e) {
    console.error("Error executing query for langkey/title:", e);
    return c.text("Error fetching data", 500);
  }
})

export default app;
