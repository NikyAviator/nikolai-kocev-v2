import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';

export default function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let abort = false;
    (async () => {
      try {
        const res = await client.get('/api/blogs');
        if (!abort) {
          setPosts(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        }
      } catch (e) {
        if (!abort) {
          console.error('Error fetching blogs:', e);
          setErr('Failed to fetch blogs');
          setLoading(false);
        }
      }
    })();
    return () => {
      abort = true;
    };
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">Fresh notes & updates</p>
        </div>

        {loading && (
          <div className="mt-16 text-center text-gray-500">Loading…</div>
        )}

        {err && !loading && (
          <div className="mt-16 text-center text-red-600">{err}</div>
        )}

        {!loading && !err && (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No posts yet.
              </div>
            )}

            {posts.map((post) => (
              <article
                key={post.id || post.slug}
                className="flex flex-col items-start justify-between"
              >
                <div className="relative w-full">
                  <img
                    alt={post.title || 'Blog cover'}
                    src={
                      post.imageUrl ||
                      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36'
                    }
                    className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                  />
                  <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10" />
                </div>

                <div className="flex max-w-xl grow flex-col justify-between">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={post.publishedAt || post.createdAt || undefined}
                      className="text-gray-500"
                    >
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : ''}
                    </time>

                    {/* Category without href */}
                    {post.category?.title && (
                      <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                        {post.category.title}
                      </span>
                    )}
                  </div>

                  <div className="group relative grow">
                    <Link to={`/blogs/${post.slug}`} className="group">
                      <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Optional tags */}
                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
