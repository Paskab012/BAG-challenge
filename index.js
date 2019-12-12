import express from 'express';
import connectDB from './config/db';
import router from './routes/app';

const app = express();

// Connect to the db
connectDB();

// Init Middlware

app.use(express.json({ extended: false }));

app.use(router);
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Page not found'
  });
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server up on port ${port}`));

export default app;
