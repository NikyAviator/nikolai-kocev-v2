// src/Pages/RenderOneBlog.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogBySlug } from '../api/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function RenderOneBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getBlogBySlug(slug);
        setBlog(data);
      } catch (e) {
        console.error(e);
        setErr('Not found');
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Loading…</div>;
  if (err) return <div className="p-8 text-center text-red-600">{err}</div>;
  if (!blog) return null;

  const published = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })
    : '';

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Meta */}
      <div className="mb-6">
        {blog.category?.title && (
          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {blog.category.title}
          </span>
        )}
        {published && (
          <span className="ml-3 align-middle text-xs text-gray-500">
            {published}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {blog.title}
      </h1>

      {/* Hero image (constrained to content width) */}
      {blog.imageUrl && (
        <figure className="my-8">
          <img
            src={blog.imageUrl}
            alt={blog.title || 'Blog cover image'}
            className="max-h-120 w-full rounded-2xl object-cover"
          />
        </figure>
      )}

      {/* Content */}
      <div className="prose prose-lg prose-neutral max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.contentMd || ''}
        </ReactMarkdown>
      </div>
    </article>
  );
}
