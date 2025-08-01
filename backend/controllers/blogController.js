export const getAllBlogs = (req, res) => res.send('all-blogs');
export const getBlogById = (req, res) => res.send(`one-blog ${req.params.id}`);
export const createBlog = (req, res) => res.send('create-blog');
export const updateBlog = (req, res) => res.send(`update ${req.params.id}`);
export const deleteBlog = (req, res) => res.send(`delete ${req.params.id}`);
