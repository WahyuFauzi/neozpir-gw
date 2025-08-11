import { z } from 'zod';

export const blogSchema = z.object({
  id: z.string(),
  title: z.string(),
  title_display: z.string(),
  content_markdown: z.string(),
  langkey: z.string(),
  is_publish: z.number().default(0),
  publish_date: z.string().optional(),
  created_by: z.string().optional(),
  category: z.string().optional(),
});
