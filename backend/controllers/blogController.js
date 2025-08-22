// blogController.js
import Blog from '../models/Blog.js';
export const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      slug: req.body.slug,
      excerpt: req.body.excerpt,
      content: req.body.content,
      coverImg: req.body.coverImg,
      category: req.body.category,
    });

    res.status(201).json({ status: 'success', data: { blog: newBlog } });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res
      .status(200)
      .json({ status: 'success', results: blogs.length, data: { blogs } });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { blog } });
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};
export const updateBlog = (req, res) => res.send(`update ${req.params.id}`);
export const deleteBlog = (req, res) => res.send(`delete ${req.params.id}`);
