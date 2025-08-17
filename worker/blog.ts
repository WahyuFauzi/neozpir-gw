import { Hono } from 'hono';
import { marked } from 'marked';
import { getDb } from './db/index.ts';
import { blog as blogSchema } from './db/schema.ts';
import { eq, and, desc } from 'drizzle-orm';
import { blogPostSchema, blogPostUpdateSchema } from './schemas.ts';
import { authMiddleware } from './middleware.ts';

const blog = new Hono();

/**
 * @api {get} /api/blog/:langkey Get Blog Posts by Language
 * @apiName GetBlogPostsByLangkey
 * @apiGroup Blog
 * @apiParam {String} langkey Language key (e.g., 'en-US', 'id-ID').
 * @apiSuccess {Object[]} blogPosts List of blog posts.
 * @apiError (Error 500) DatabaseError The database binding is not configured or an error occurred during query execution.
 * @apiError (Error 404) NotFound No blog posts found for the specified language key.
 */
blog.get('/:langkey', async (c) => {
  // @ts-ignore
  const db = getDb(c.env.BLOG);
  if (!db) {
    console.error("DB binding not found. Check wrangler.toml configuration.");
    return c.text("Database binding not configured", 500);
  }

  const langkey = c.req.param('langkey');
  try {
    const results = await db.select()
      .from(blogSchema)
      .where(and(eq(blogSchema.langkey, langkey), eq(blogSchema.is_publish, 1)))
      .orderBy(desc(blogSchema.publish_date));

    if (results.length === 0) {
      return c.notFound();
    }
    return c.json(results);
  } catch (e) {
    console.error("Error fetching blog posts by langkey:", e);
    return c.text("Error fetching data", 500);
  }
})

/**
 * @api {get} /api/blog/:langkey/:title Get Single Blog Post by Language and Title
 * @apiName GetBlogPostByLangkeyAndTitle
 * @apiGroup Blog
 * @apiParam {String} langkey Language key (e.g., 'en-US', 'id-ID').
 * @apiParam {String} title Title slug of the blog post.
 * @apiSuccess {Object} blogPost Single blog post content, including HTML rendered from markdown.
 * @apiError (Error 500) DatabaseError The database binding is not configured or an error occurred during query execution.
 * @apiError (Error 404) NotFound No blog post found for the specified language key and title.
 */
blog.get('/:langkey/:title', async (c) => {
  // @ts-ignore
  const db = getDb(c.env.BLOG);
  if (!db) {
    console.error("DB binding not found. Check wrangler.toml configuration.");
    return c.text("Database binding not configured", 500);
  }

  const langkey = c.req.param('langkey');
  const title = c.req.param('title');
  try {
    const results = await db.select()
      .from(blogSchema)
      .where(and(eq(blogSchema.langkey, langkey), eq(blogSchema.title, title), eq(blogSchema.is_publish, 1)));

    if (results.length === 0) {
      return c.notFound();
    }

    const post = blogPostSchema.parse({
      ...results[0],
      isPublish: results[0].is_publish === 1, // Convert number to boolean
      publishDate: results[0].publish_date,
      contentMarkdown: results[0].content_markdown,
      titleDisplay: results[0].title_display,
      createdBy: results[0].created_by,
      createdDate: results[0].created_date,
      thumbnailSrc: results[0].thumbnail_src,
    }); // Validate with Zod
    const html = await marked(post.contentMarkdown);

    const responsePayload = {
      html: html,
      titleDisplay: post.titleDisplay,
      author: post.createdBy,
      publishDate: post.publishDate,
      category: post.category,
      contentMarkdown: post.contentMarkdown,
      createdDate: post.createdDate,
      thumbnailSrc: post.thumbnailSrc,
    };

    return c.json(responsePayload);
  } catch (e) {
    console.error("Error fetching blog post by langkey/title:", e);
    return c.text("Error fetching data", 500);
  }
})

/**
 * @api {put} /api/blog/:langkey/:title Update Blog Post
 * @apiName UpdateBlogPost
 * @apiGroup Blog
 * @apiParam {String} langkey Language key (e.g., 'en-US', 'id-ID').
 * @apiParam {String} title Title slug of the blog post.
 * @apiBody {String} [titleDisplay] Display title of the blog post.
 * @apiBody {String} [contentMarkdown] Markdown content of the blog post.
 * @apiBody {String} [author] Author of the blog post.
 * @apiBody {String} [publishDate] Publish date of the blog post.
  @apiBody {String} [category] Category of the blog post.
 * @apiSuccess {Object} blogPost Updated blog post content, including HTML rendered from markdown.
 * @apiError (Error 400) BadRequest Invalid request body.
 * @apiError (Error 500) DatabaseError The database binding is not configured or an error occurred during update/query execution.
 * @apiError (Error 404) NotFound No blog post found for the specified language key and title after update.
 */
blog.put('/:langkey/:title', authMiddleware, async (c) => {
  // @ts-ignore
  const db = getDb(c.env.BLOG);
  if (!db) {
    console.error("DB binding not found. Check wrangler.toml configuration.");
    return c.text("Database binding not configured", 500);
  }

  const langkey = c.req.param('langkey');
  const title = c.req.param('title');
  const body = await c.req.json();
  const user = c.get('user'); // Get user from context

  if (!user || !user.$id) {
    return c.text("Unauthorized: User ID not found in context", 403);
  }

  // Fetch the existing blog post to check ownership
  try {
    const existingPost = await db.select()
      .from(blogSchema)
      .where(and(eq(blogSchema.langkey, langkey), eq(blogSchema.title, title)));

    if (existingPost.length === 0) {
      return c.notFound();
    }

    if (existingPost[0].created_by !== user.$id) {
      return c.text("Forbidden: You are not the creator of this blog post", 403);
    }
  } catch (e) {
    console.error("Error checking blog post ownership:", e);
    return c.text("Error checking ownership", 500);
  }

  const parsedBody = blogPostUpdateSchema.safeParse(body);
  if (!parsedBody.success) {
    console.error("Invalid request body:", parsedBody.error);
    return c.json({ error: "Invalid request body", details: parsedBody.error }, 400);
  }

  const { titleDisplay, contentMarkdown, author, publishDate, category, isPublish, createdDate, thumbnailSrc } = parsedBody.data;

  try {
    await db.update(blogSchema)
      .set({
        title_display: titleDisplay,
        content_markdown: contentMarkdown,
        created_by: author,
        publish_date: publishDate,
        category: category,
        is_publish: isPublish !== undefined ? (isPublish ? 1 : 0) : undefined,
        created_date: createdDate,
        thumbnail_src: thumbnailSrc,
      })
      .where(and(eq(blogSchema.langkey, langkey), eq(blogSchema.title, title)));
  } catch (e) {
    console.error("Error updating blog post:", e);
    return c.text("Error updating data", 500);
  }

  try {
    const results = await db.select()
      .from(blogSchema)
      .where(and(eq(blogSchema.langkey, langkey), eq(blogSchema.title, title)))

    if (results.length === 0) {
      return c.notFound();
    }

    const post = blogPostSchema.parse({
      ...results[0],
      isPublish: results[0].is_publish === 1, // Convert number to boolean
      publishDate: results[0].publish_date,
      contentMarkdown: results[0].content_markdown,
      titleDisplay: results[0].title_display,
      createdBy: results[0].created_by,
      createdDate: results[0].created_date,
      thumbnailSrc: results[0].thumbnail_src,
    }); // Validate with Zod
    const html = await marked(post.contentMarkdown);

    const responsePayload = {
      html: html,
      titleDisplay: post.titleDisplay,
      author: post.createdBy,
      publishDate: post.publishDate,
      category: post.category,
      contentMarkdown: post.contentMarkdown,
      createdDate: post.createdDate,
      thumbnailSrc: post.thumbnailSrc,
    };

    return c.json(responsePayload);
  } catch (e) {
    console.error("Error fetching blog post after update:", e);
    return c.text("Error fetching data after update", 500);
  }
});

/**
 * @api {post} /api/blog Create New Blog Post
 * @apiName CreateBlogPost
 * @apiGroup Blog
 * @apiBody {String} langkey Language key (e.g., 'en-US', 'id-ID').
 * @apiBody {String} title Title slug of the blog post.
 * @apiBody {String} titleDisplay Display title of the blog post.
 * @apiBody {String} contentMarkdown Markdown content of the blog post.
 * @apiBody {String} author Author of the blog post.
 * @apiBody {String} publishDate Publish date of the blog post.
 * @apiBody {String} category Category of the blog post.
 * @apiBody {Number} isPublish Whether the blog post is published (0 or 1).
 * @apiSuccess {Object} blogPost Created blog post content.
 * @apiError (Error 400) BadRequest Invalid request body.
 * @apiError (Error 500) DatabaseError The database binding is not configured or an error occurred during insertion.
 */
blog.post('/', authMiddleware, async (c) => {
  // @ts-ignore
  const db = getDb(c.env.BLOG);
  if (!db) {
    console.error("DB binding not found. Check wrangler.toml configuration.");
    return c.text("Database binding not configured", 500);
  }

  const body = await c.req.json();
  const parsedBody = blogPostSchema.safeParse(body);

  if (!parsedBody.success) {
    console.error("Invalid request body:", parsedBody.error);
    return c.json({ error: "Invalid request body", details: parsedBody.error }, 400);
  }

  const { langkey, title, titleDisplay, contentMarkdown, publishDate, category, isPublish, createdDate, thumbnailSrc } = parsedBody.data;
  const user = c.get('user'); // Get user from context

  if (!user || !user.$id) {
    return c.text("Unauthorized: User ID not found in context", 403);
  }

  try {
    await db.insert(blogSchema).values({
      langkey,
      title,
      title_display: titleDisplay,
      content_markdown: contentMarkdown,
      created_by: user.$id, // Set createdBy from authenticated user
      publish_date: publishDate,
      category,
      is_publish: isPublish ? 1 : 0,
      created_date: createdDate,
      thumbnail_src: thumbnailSrc,
    });

    return c.json({ message: "Blog post created successfully", post: parsedBody.data }, 201);
  } catch (e) {
    console.error("Error creating blog post:", e);
    return c.text("Error creating blog post", 500);
  }
});

export default blog;
