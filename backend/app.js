const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// 1) Enable CORS for *ALL* origins (DEVELOPMENT ONLY)
app.use(cors());

// 2) Parse JSON bodies
app.use(express.json());

// 3) MAYBE ROUTER HERE?
// import postsRouter from './routes/posts.js';
// app.use('/api/posts', postsRouter);

// 4) Health check endpoint
app.get('/', (req,res) =>{
    res.send('Hello my little gopher!');
})


app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`PPC`);  
});