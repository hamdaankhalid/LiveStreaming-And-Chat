import express from 'express';

const router = express.Router();

router.post('/admin/signout', (req, res)=>{
  req.session = null;
  res.redirect(200, '../admin/signin');
});

export {router as signoutRouter};
