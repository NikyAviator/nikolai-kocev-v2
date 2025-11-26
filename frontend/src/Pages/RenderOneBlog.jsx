import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import client from '../api/client';

export default function RenderOneBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let abort = false;
    (async () => {
      try {
        const res = await client.get(`/api/blogs/${slug}`);
        if (!abort) {
          setBlog(res.data);
          setLoading(false);
        }
      } catch (e) {
        if (!abort) {
          console.error('Error fetching blog:', e);
          setErr('Failed to load blog');
          setLoading(false);
        }
      }
    })();
    return () => {
      abort = true;
    };
  }, [slug]);

  if (loading) return <div className="p-8 text-gray-500">Loading…</div>;
  if (err) return <div className="p-8 text-red-600">{err}</div>;
  if (!blog) return <div className="p-8">Not found</div>;

  return (
    <article className="mx-auto max-w-3xl p-6">
      <div className="mb-4">
        <Link to="/blogs" className="text-sm text-blue-600 hover:underline">
          &larr; Back to all blogs
        </Link>
      </div>

      <h1 className="mt-2 text-3xl font-bold text-gray-900">{blog.title}</h1>

      <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
        {blog.category?.title && (
          <span className="rounded-full bg-gray-100 px-3 py-1">
            {blog.category.title}
          </span>
        )}
        {blog.publishedAt && (
          <time className="text-gray-500">
            {new Date(blog.publishedAt).toLocaleDateString()}
          </time>
        )}
      </div>

      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="mt-6 w-full rounded-2xl object-cover"
        />
      )}

      <div className="prose prose-neutral mt-8 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.contentMd || ''}
        </ReactMarkdown>
      </div>

      {Array.isArray(blog.tags) && blog.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {blog.tags.map((t) => (
            <span
              key={t}
              className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
