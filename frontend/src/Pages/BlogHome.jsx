import { useEffect, useState } from 'react';
import getBlogs from '../api/client';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return '';
  }
}

export default function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getBlogs();
        if (!cancelled) setPosts(data);
      } catch (e) {
        if (!cancelled) setErr(e.message || 'Failed to load blogs');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-gray-600">Loading blogs…</p>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="text-red-600">Error: {err}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">Poggers in da chatta</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id || post.slug}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <img
                  alt={post.title || ''}
                  src={post.imageUrl}
                  className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                />
                <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10" />
              </div>

              <div className="flex max-w-xl grow flex-col justify-between">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.publishedAt} className="text-gray-500">
                    {formatDate(post.publishedAt)}
                  </time>
                  <a
                    href={post.category?.href || '#'}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category?.title ?? '—'}
                  </a>
                </div>

                <div className="group relative grow">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href={post.href || `#/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                    {post.excerpt}
                  </p>
                </div>

                <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                  <img
                    alt={post.author?.name || ''}
                    src={post.author?.imageUrl}
                    className="size-10 rounded-full bg-gray-100"
                  />
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author?.href || '#'}>
                        <span className="absolute inset-0" />
                        {post.author?.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author?.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No blogs yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
