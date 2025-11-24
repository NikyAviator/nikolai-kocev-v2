// frontend/src/Pages/RenderOneBlog.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogBySlug } from '../api/client';

export default function RenderOneBlog() {
  const { slug } = useParams(); // URL like /blog/my-post
  const [blog, setBlog] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getBlogBySlug(slug); // GET /api/blogs/:slug
        if (alive) {
          setBlog(data);
          setErr(null);
        }
      } catch (e) {
        if (alive) setErr(e.message || 'Failed to load blog');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) return <div className="p-6 text-gray-500">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;
  if (!blog) return <div className="p-6 text-gray-500">Not found.</div>;

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link to="/blogs" className="text-sm text-blue-600">
        ← Back to all blogs
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{blog.title}</h1>
      {blog.excerpt && <p className="mt-2 text-gray-600">{blog.excerpt}</p>}

      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="mt-6 w-full rounded-xl"
        />
      )}

      <article className="prose mt-8 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.contentMd || ''}
        </ReactMarkdown>
      </article>

      <footer className="mt-10 text-sm text-gray-500">
        {blog.author?.name && <>By {blog.author.name}</>}
        {blog.publishedAt && (
          <> · {new Date(blog.publishedAt).toLocaleDateString()}</>
        )}
      </footer>
    </main>
  );
}
