const app = require('./app');
const connectDB = require('./config/db');

// Connect to the database
app.use(connectDB);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`PPC`);
});
