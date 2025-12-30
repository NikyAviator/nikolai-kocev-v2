// src/Pages/BlogHome.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../api/client';

export default function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getBlogs();
        setPosts(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErr('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading…</div>;
  if (err) return <div className="p-8 text-center text-red-600">{err}</div>;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            From the Blog
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No blog posts available.
            </div>
          ) : (
            posts.map((post) => {
              const pub = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })
                : '';

              return (
                <article
                  key={post.id || post.slug}
                  className="flex flex-col items-start justify-between"
                >
                  <div className="relative w-full">
                    <img
                      alt={post.title || 'Blog cover'}
                      src={post.imageUrl}
                      className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                    />
                    <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10" />
                  </div>

                  <div className="flex max-w-xl grow flex-col justify-between">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time className="text-gray-500">{pub}</time>
                      {post.category?.title && (
                        <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                          {post.category.title}
                        </span>
                      )}
                    </div>

                    <div className="group relative grow">
                      <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
                      </h3>

                      {post.excerpt && (
                        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
