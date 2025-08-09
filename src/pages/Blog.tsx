import { createSignal, createEffect } from "solid-js";
import { useParams } from "@solidjs/router";
import { useI18n } from '../i18n/I18nContext';

function Blog() {
  const [content, setContent] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [author, setAuthor] = createSignal("");
  const [publishDate, setPublishDate] = createSignal("");
  const [category, setCategory] = createSignal("");
  const params = useParams();
  const { t } = useI18n();

  createEffect(async () => {
    const { title } = params;
    const currentLangkey = t('selectedLanguage');

    if (currentLangkey && title) {
      const res = await fetch(`/api/blog/${currentLangkey}/${title}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.titleDisplay);
        setContent(data.html);
        setAuthor(data.author);
        setPublishDate(data.publishDate);
        setCategory(data.category);
      } else {
        console.error("Failed to fetch blog post:", res.status, res.statusText);
        setContent("<p>Error loading blog post.</p>");
      }
    } else {
      setContent("<p>Blog post not specified.</p>");
    }
  });

  return (
    <div class="container mx-auto py-8">
      <div class="max-w-prose mx-auto mb-4">
        {title() && <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 mb-4"> {title()} </h1>}
        <div class="text-gray-600">
          {author() && <p>By: {author()}</p>}
          {publishDate() && <p>Published on: {new Date(publishDate()).toLocaleDateString()}</p>}
          {category() && <p>Category: {category()}</p>}
        </div>
      </div>
      <article class="prose prose-slate max-w-prose mx-auto" innerHTML={content()} />
    </div>
  );
}

export default Blog;
