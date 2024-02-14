import dotenv from 'dotenv';
import express from 'express';
import connectDB from './utils/db.js';
import apiRoutes from './routes/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// connecting to database
connectDB();

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}));
app.use(express.urlencoded({extended: true}));

// routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port:${PORT}`);
});