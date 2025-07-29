const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

//0) Global middleware
app.use(morgan('dev')); // Logging middleware

// 1) Enable CORS for *ALL* origins (DEVELOPMENT ONLY)
app.use(cors());

// 2) Parse JSON bodies
app.use(express.json());

// 3) MAYBE ROUTER HERE?
// import postsRouter from './routes/posts.js';
// app.use('/api/posts', postsRouter);

// 4) Health check endpoint
app.get('/api', (req,res) =>{
    res.status(200).json({message: 'Hello my little gopher!', app: 'nikolai-kocev-v2', version: '1.0.0'});
})

app.get('/api/blogs', (req,res) => {
})

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`PPC`);  
});