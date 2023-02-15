import express from 'express'
const app = express();
const port = 8000;
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import appRouter from './routes/todoRoute.js'


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://aliGhouri:Alighouri@cluster0.fo9cxyz.mongodb.net/test"
);

app.use('/todo', appRouter)


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
