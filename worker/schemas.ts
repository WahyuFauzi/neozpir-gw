import { z } from 'zod';

export const blogPostSchema = z.object({
  id: z.number().optional(),
  langkey: z.enum(["en-US", "id-ID"]),
  title: z.string(),
  isPublish: z.boolean(),
  publishDate: z.string(),
  contentMarkdown: z.string(),
  titleDisplay: z.string(),
  createdBy: z.string(),
  category: z.string(),
  createdDate: z.string(),
  thumbnailSrc: z.string().nullable().optional(),
});

export const blogPostUpdateSchema = z.object({
  titleDisplay: z.string().optional(),
  contentMarkdown: z.string().optional(),
  author: z.string().optional(),
  publishDate: z.string().optional(),
  isPublish: z.boolean().optional(),
  category: z.string().optional(),
  createdDate: z.string().optional(),
  thumbnailSrc: z.string().nullable().optional(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
export type BlogPostUpdate = z.infer<typeof blogPostUpdateSchema>;
