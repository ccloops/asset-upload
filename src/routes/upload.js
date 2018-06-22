'use strict';

import express from 'express';
import multer from 'multer';

import auth from '../auth/middleware.js';
import s3 from '../lib/s3.js';

const uploadRouter = express.Router();

const upload = multer({dest:`${__dirname}/../tmp`});

uploadRouter.post('/upload', auth, upload.any(), (req, res, next) => {
  if(!req.body.title || req.files.length > 1) {
    return next('Invalid File Upload');
  }

  let file = req.files[0];
  let key = `${file.filename}.${file.originalname}`;

  return s3.upload(file.path, key)
    .then(url => {
      let output = {
        url: url,
      };
      res.send(output);
    })
    .catch(next);
});