// src/Pages/RenderOneBlog.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
        setErr('Not found');
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Loading…</div>;
  if (err) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">{err}</p>
        <Link to="/blogs" className="text-blue-600 underline">
          Back to blogs
        </Link>
      </div>
    );
  }
  if (!blog) return null;

  return (
    <article className="prose prose-neutral mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/blogs" className="text-sm text-blue-600 underline">
        &larr; All blogs
      </Link>

      <h1 className="mb-2">{blog.title}</h1>

      <p className="text-sm text-gray-500">
        {new Date(blog.publishedAt).toLocaleString()}{' '}
        {blog.category?.title ? `• ${blog.category.title}` : ''}
      </p>

      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="my-6 w-full rounded-xl"
        />
      )}

      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {blog.contentMd || ''}
      </ReactMarkdown>

      {Array.isArray(blog.tags) && blog.tags.length > 0 && (
        <p className="mt-6 text-sm text-gray-600">
          Tags: {blog.tags.join(', ')}
        </p>
      )}
    </article>
  );
}
