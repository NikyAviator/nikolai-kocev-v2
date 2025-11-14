export default async function getBlogs() {
  try {
    const res = await fetch('/api/blogs', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}
