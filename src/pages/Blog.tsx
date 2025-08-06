import { createSignal, createEffect } from "solid-js";
import { useParams } from "@solidjs/router";
import { useI18n } from '../i18n/I18nContext';

function Blog() {
  const [content, setContent] = createSignal("");
  const params = useParams();
  const { t } = useI18n();

  createEffect(async () => {
    const { title } = params;
    const currentLangkey = t('selectedLanguage');

    if (currentLangkey && title) {
      const res = await fetch(`/api/blog/${currentLangkey}/${title}`);
      if (res.ok) {
        const html = await res.text();
        setContent(html);
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
      <article class="prose prose-slate max-w-prose mx-auto" innerHTML={content()} />
    </div>
  );
}

export default Blog;
