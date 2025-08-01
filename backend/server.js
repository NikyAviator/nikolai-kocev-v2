// server.js  (entry point)
import 'dotenv/config.js'; // loads .env (no separate dotenv.config())
import app from './app.js';
import connectDB from './config/db.js'; // make sure this file also uses “export default”

await connectDB(); // ensures DB is ready first

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`API listening → http://localhost:${PORT}`);
});
