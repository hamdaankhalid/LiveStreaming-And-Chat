import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/admin/signin', (req, res)=>{
  res.render('adminPages/signin');
});

router.post('/admin/signin', (req, res)=>{
  // check if email and password match up if they do create a jwt
  // and store int in cookie
  const {email, password} = req.body;

  if ((email !== process.env.USERNAME) || (password !== process.env.PASSWORD)) {
    res.render('adminPages/signin', {error: 'Invalid credentials'});
  }

  // generate JWT
  const userJwt = jwt.sign({
    email: email,
  },
  process.env.JWT_KEY!,
  );

  // store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.redirect('../admin/stream');
});


export {router as signinRouter};
