import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import shopifyProductsEn from "./ecommerce/shopify-plans.en.json"
import shopifyProductsId from "./ecommerce/shopify-plans.id.json"
import { HTTPException } from 'hono/http-exception'

const app = new Hono();

app.get('/api/product/:product', async (c) => {
  const product = c.req.param('product')
  const langKey = c.req.query('langKey')
  console.log(product)
  if (product == 'shopify') {
    if (langKey == 'id-ID') return c.json(shopifyProductsId)
    else if (langKey == 'en-US' || langKey == null) return c.json(shopifyProductsEn)
  } else {
    throw new HTTPException (404, { message : 'Product not Found' }) }
})

export const onRequest = handle(app);
