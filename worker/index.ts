import { Hono } from 'hono';
import { cors } from 'hono/cors';
import admin from './admin.ts';
import product from './product.ts';
import blog from './blog.ts';
import { getDb } from './db/index.ts';
import { blog as blogSchema } from './db/schema.ts';
import { eq, and } from 'drizzle-orm';

const app = new Hono();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://neozpir.com", "https://www.neozpir.com"],
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'],
    allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
);

app.route('/api/admin', admin);
app.route('/api/product', product);
app.route('/api/blog', blog);

async function getPosts(c: any) {
  const db = getDb(c.env.BLOG);
  if (!db) {
    console.error("DB binding not found. Check wrangler.toml configuration.");
    return [];
  }

  try {
    const enPosts = await db.select()
      .from(blogSchema)
      .where(and(eq(blogSchema.langkey, 'en-US'), eq(blogSchema.is_publish, 1)));

    const idPosts = await db.select()
      .from(blogSchema)
      .where(and(eq(blogSchema.langkey, 'id-ID'), eq(blogSchema.is_publish, 1)));

    const allPosts = [...enPosts, ...idPosts].map(p => ({
      url: `https://neozpir.com/${p.langkey}/blog/${p.title}`,
      lastmod: p.publish_date ? new Date(p.publish_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    }));

    return allPosts;
  } catch (e) {
    console.error("Error fetching posts for sitemap:", e);
    return [];
  }
}

app.get('/sitemap.xml', async (c) => {
  const posts = await getPosts(c);
  const staticPages = [
    { url: 'https://neozpir.com/about', lastmod: '2025-08-18', priority: '0.8' },
    { url: 'https://neozpir.com/partnership', lastmod: '2025-08-31', priority: '0.8' },
    { url: 'https://neozpir.com/products', lastmod: '2025-08-18', priority: '0.8' },
    { url: 'https://neozpir.com/products/ecommerce', lastmod: '2025-08-18', priority: '0.9' },
    { url: 'https://neozpir.com/products/enterprise', lastmod: '2025-08-18', priority: '0.9' },
    { url: 'https://neozpir.com/products/automation', lastmod: '2025-08-18', priority: '0.9' },
    { url: 'https://neozpir.com/products/custom', lastmod: '2025-08-18', priority: '0.9' },
  ];

  const postUrls = posts.map(
    (p) => `
    <url>
      <loc>${p.url}</loc>
      <lastmod>${p.lastmod}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>`
  ).join('');

  const staticUrls = staticPages.map(
    (p) => `
    <url>
      <loc>${p.url}</loc>
      <lastmod>${p.lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${p.priority}</priority>
    </url>`
  ).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://neozpir.com/</loc>
      <lastmod>2025-08-18</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    ${staticUrls}
    ${postUrls}
  </urlset>`;

  return c.text(sitemap, 200, { 'Content-Type': 'application/xml' });
});

export default app;

