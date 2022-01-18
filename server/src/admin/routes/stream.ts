import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/admin/stream', (req, res)=>{
  // if haslegit cookie render else redirect to login
  if (!req.session?.jwt) {
    res.redirect(403, '../admin/signin');
  }

  try {
    jwt.verify(
            req.session!.jwt,
            process.env.JWT_KEY!,
    );
    res.render('adminPages/stream');
  } catch (error) {
    res.redirect(403, '../admin/signin');
  }
});

export {router as adminStreamRouter};
