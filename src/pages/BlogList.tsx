import { createResource, For, createEffect } from 'solid-js';
import { useI18n } from '../i18n/I18nContext';
import { blogService } from '../service/blog.service';
import defaultThumbnail from '../assets/default-thumbnail.jpeg';
import { A } from '@solidjs/router';

const formatTitleForDisplay = (title: string) => {
  let formattedTitle = title.replace(/(?<!\\)-/g, ' ');
  formattedTitle = formattedTitle.replace(/\\-/g, '-');
  formattedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
  return formattedTitle;
};

const BlogList = () => {
  const { t } = useI18n();
  const [blogPosts] = createResource(() => t('selectedLanguage'), blogService.getBlogByLangkey);

  createEffect(() => {
    const currentLanguage = t('selectedLanguage');
    console.log('Current language:', currentLanguage);
  });

  return (
    <div>
      <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-6">{t('blog.title')}</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <For each={blogPosts()}>
            {(post) => (
              <A href={`/blog/${post.langkey}/${post.title}`} class="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <img src={defaultThumbnail} alt="Blog Thumbnail" class="w-full h-48 object-cover rounded-md mb-4" />
                <h2 class="text-xl font-semibold mb-2">{formatTitleForDisplay(post.title_display)}</h2>
                <p class="text-sm text-gray-700 mb-2">{t('blog.by')} {post.created_by}</p>
                <p class="text-xs text-gray-500">{new Date(post.publish_date).toLocaleDateString()}</p>
              </A>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
