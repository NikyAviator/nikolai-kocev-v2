const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .trim();

const cards = [
  {
    title: 'How to use search engine optimization to drive sales',
    description:
      'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?auto=format&fit=crop&w=3270&q=80',
    category: { title: 'Sales', href: '#' },
  },
  {
    title: 'Improve your customer experience',
    description:
      'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus...',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=3270&q=80',
    category: { title: 'Business', href: '#' },
  },
  {
    title: 'Boost your conversion rate',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo...',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?auto=format&fit=crop&w=3603&q=80',
    category: { title: 'Marketing', href: '#' },
  },
];

const blogs = cards.map((c) => ({
  title: c.title,
  slug: slugify(c.title), // REQUIRED by schema
  excerpt: c.description, // REQUIRED by schema
  content: c.description, // REQUIRED by schema (use real content later)
  coverImg: c.imageUrl, // map -> coverImg
  category: c.category.title, // map object -> string
  author: admin._id, // ObjectId ref to User (not an embedded object)
  published: true,
  tags: [c.category.title.toLowerCase()],
}));

export default blogs;
