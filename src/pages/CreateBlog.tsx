import { createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { useI18n } from '../i18n/I18nContext.tsx';
import BlogService from '../service/blog.service.ts';
import { useAuthContext } from '../context/auth.context';

function CreateBlog() {
  const [title, setTitle] = createSignal('');
  const [titleDisplay, setTitleDisplay] = createSignal('');
  const [contentMarkdown, setContentMarkdown] = createSignal('');
  const [author, setAuthor] = createSignal('');
  const [category, setCategory] = createSignal('');
  const [thumbnailSrc, setThumbnailSrc] = createSignal('');
  const [isPublish, setIsPublish] = createSignal(false);
  const [error, setError] = createSignal('');
  const [success, setSuccess] = createSignal('');

  const navigate = useNavigate();
  const { t } = useI18n();
  const blogService = new BlogService(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787');
  const { auth } = useAuthContext();

  const isLoggedIn = () => !!auth().session;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const currentLangkey = t('selectedLanguage');
    const publishDate = new Date().toISOString().split('T')[0]; // Current date as YYYY-MM-DD
    const createdDate = new Date().toISOString();

    if (!title() || !titleDisplay() || !contentMarkdown() || !author() || !category() || !currentLangkey) {
      setError('All fields are required.');
      return;
    }

    try {
      const newPost = {
        langkey: currentLangkey,
        title: title(),
        titleDisplay: titleDisplay(),
        contentMarkdown: contentMarkdown(),
        author: author(),
        publishDate: publishDate,
        category: category(),
        isPublish: isPublish(),
        createdDate: createdDate,
        thumbnailSrc: thumbnailSrc(),
      };
      await blogService.createBlogPost(newPost);
      setSuccess('Blog post created successfully!');
      navigate(`/${currentLangkey}/blog/${title()}`); // Redirect to the new blog post
    } catch (err) {
      console.error('Failed to create blog post:', err);
      setError('Failed to create blog post. Please try again.');
    }
  };

  if (!isLoggedIn()) {
    return (
      <div class="container mx-auto px-4 py-4 sm:py-8 text-center">
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4">Access Denied</h1>
        <p>You must be logged in to create new blog posts.</p>
      </div>
    );
  }

  return (
    <div class="container mx-auto px-4 py-4 sm:py-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-8 text-center">
        Create New Blog Post
      </h1>
      <form onSubmit={handleSubmit} class="max-w-prose mx-auto space-y-4">
        <Show when={error()}>
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error()}
          </div>
        </Show>
        <Show when={success()}>
          <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            {success()}
          </div>
        </Show>

        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">
            Title (URL Slug)
          </label>
          <input
            type="text"
            id="title"
            value={title()}
            onInput={(e) => setTitle(e.currentTarget.value)}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g., my-awesome-blog-post"
            required
          />
        </div>

        <div>
          <label for="titleDisplay" class="block text-sm font-medium text-gray-700">
            Display Title
          </label>
          <input
            type="text"
            id="titleDisplay"
            value={titleDisplay()}
            onInput={(e) => setTitleDisplay(e.currentTarget.value)}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g., My Awesome Blog Post"
            required
          />
        </div>

        <div>
          <label for="author" class="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author()}
            onInput={(e) => setAuthor(e.currentTarget.value)}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g., John Doe"
            required
          />
        </div>

        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category()}
            onInput={(e) => setCategory(e.currentTarget.value)}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g., Technology, Marketing"
            required
          />
        </div>

        <div>
          <label for="thumbnailSrc" class="block text-sm font-medium text-gray-700">
            Thumbnail Source URL
          </label>
          <input
            type="text"
            id="thumbnailSrc"
            value={thumbnailSrc()}
            onInput={(e) => setThumbnailSrc(e.currentTarget.value)}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g., /assets/default-thumbnail.jpeg"
          />
        </div>

        <div>
          <label for="contentMarkdown" class="block text-sm font-medium text-gray-700">
            Content (Markdown)
          </label>
          <textarea
            id="contentMarkdown"
            value={contentMarkdown()}
            onInput={(e) => setContentMarkdown(e.currentTarget.value)}
            rows="10"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Write your blog post content in Markdown here..."
            required
          />
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="isPublish"
            checked={isPublish()}
            onInput={(e) => setIsPublish(e.currentTarget.checked)}
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="isPublish" class="ml-2 block text-sm text-gray-900">
            Publish Immediately
          </label>
        </div>

        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Blog Post
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
