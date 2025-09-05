import { Hono } from 'hono';
import shopifyProductsEn from './ecommerce/shopify-plans.en.json';
import shopifyProductsId from './ecommerce/shopify-plans.id.json';
import enterpriseProductsEn from './ecommerce/enterprise-plans.en.json';
import enterpriseProductsId from './ecommerce/enterprise-plans.id.json';
import automationProductsEn from './ecommerce/automation-plans.en.json';
import automationProductsId from './ecommerce/automation-plans.id.json';

const product = new Hono();

product.get('/:product', async (c) => {
  const product = c.req.param('product');
  const langKey = c.req.query('langKey');
  switch (langKey) {
    case 'id-ID':
      if (product == 'shopify') return c.json(shopifyProductsId);
      if (product == 'enterprise') return c.json(enterpriseProductsId);
      if (product == 'automation') return c.json(automationProductsId);
      break;
    case 'en-US':
      if (product == 'shopify') return c.json(shopifyProductsEn);
      if (product == 'enterprise') return c.json(enterpriseProductsEn);
      if (product == 'automation') return c.json(automationProductsEn);
    default:
      console.error('Language unknown');
      if (product == 'shopify') return c.json(shopifyProductsEn);
      if (product == 'enterprise') return c.json(enterpriseProductsEn);
      if (product == 'automation') return c.json(automationProductsEn);
  }
});

export default product;
