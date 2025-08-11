import { createSignal, createEffect, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { useI18n } from '../i18n/I18nContext.tsx';

function Blog() {
  const [content, setContent] = createSignal("");
  const [contentText, setContentText] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [titleDisplay, setTitleDisplay] = createSignal("");
  const [author, setAuthor] = createSignal("");
  const [publishDate, setPublishDate] = createSignal("");
  const [category, setCategory] = createSignal("");
  const [isEditing, setIsEditing] = createSignal(false);
  const isAdmin = localStorage.getItem("adminToken") === "tempStupidKey101";

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
        setContentText(data.contentMarkdown);
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

  const handleSave = async () => {
    const { title: paramTitle } = params;
    const currentLangkey = t('selectedLanguage');
    const updatedPost = {
      titleDisplay: titleDisplay(),
      contentMarkdown: contentText(),
      author: author(),
      publishDate: publishDate(),
      category: category(),
    };

    const res = await fetch(`/api/blog/${currentLangkey}/${paramTitle}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    });

    if (res.ok) {
      const data = await res.json();
      setTitle(data.titleDisplay);
      setContent(data.html);
      setContentText(data.contentMarkdown);
      setAuthor(data.author);
      setPublishDate(data.publishDate);
      setCategory(data.category);
      setIsEditing(false);
    } else {
      alert('Failed to save post');
    }
  };

  return (
    <div class="container mx-auto px-4 py-4 sm:py-8">
      <div class="max-w-prose mx-auto mb-4 px-2">
        <Show
          when={!isEditing()}
          fallback={
            <div>
              <input type="text" value={titleDisplay()} onInput={(e) => setTitleDisplay(e.currentTarget.value)} class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4 w-full" />
              <div class="text-gray-600">
                <input type="text" value={author()} onInput={(e) => setAuthor(e.currentTarget.value)} class="w-full mb-2" placeholder="Author" />
                <input type="date" value={publishDate()} onInput={(e) => setPublishDate(e.currentTarget.value)} class="w-full mb-2" />
                <input type="text" value={category()} onInput={(e) => setCategory(e.currentTarget.value)} class="w-full mb-2" placeholder="Category" />
              </div>
            </div>
          }
        >
          {title() && <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4"> {title()} </h1>}
          <div class="text-gray-600">
            {author() && <p>By: {author()}</p>}
            {publishDate() && <p>Published on: {new Date(publishDate()).toLocaleDateString()}</p>}
            {category() && <p>Category: {category()}</p>}
          </div>
        </Show>
      </div>

      <Show
        when={!isEditing()}
        fallback={
          <div class="max-w-prose mx-auto">
            <textarea class="w-full h-96 border rounded-md p-2" value={contentText()} onInput={(e) => setContentText(e.currentTarget.value)} />
          </div>
        }
      >
        <article class="prose prose-slate max-w-prose mx-auto" innerHTML={content()} />
      </Show>

      <div class="max-w-prose mx-auto mt-4 flex justify-end gap-2">
        {isAdmin && (
          <Show
            when={isEditing()}
            fallback={
              <button
                onClick={() => setIsEditing(true)}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
            }
          >
            <button
              onClick={handleSave}
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </Show>
        )}
      </div>
    </div>
  );
}

export default Blog;
