import express from 'express';
// import { json } from 'body-parser';
//import cookieSession from 'cookie-session';

const app = express();
// app.set('trust proxy', true);
// app.use(json());

// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV !== 'test'
//   })
// );

app.get('/health', (req, res) => {
  res.sendStatus(200);
})

export { app };