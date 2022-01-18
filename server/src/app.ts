import express from 'express';
import cookieSession from 'cookie-session';
import {signoutRouter} from './admin/routes/signout';
import {signinRouter} from './admin/routes/signin';
import {json, urlencoded} from 'body-parser';
import {adminStreamRouter} from './admin/routes/stream';
import cors from 'cors';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors());

app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use('/public', express.static('src/public'));

app.use(
    cookieSession({
      signed: false,
      secure: false,
    }),
);

app.use(signinRouter);
app.use(signoutRouter);
app.use(adminStreamRouter);

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

export {app};
