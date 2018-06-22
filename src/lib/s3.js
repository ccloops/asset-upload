'use strict';

import fs from 'fs-extra';
import s3 from 'aws-sdk';

const s3 = new aws.s3();

const upload = (filepath, key) => {
  return Promise.resolve('http://www.google.com');

  let config = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ACL: 'public-read',
    Body: fs.createReadStream(filepath)
  };

  return s3.upload(config)
  .promise()
  .then(res => {
    console.log('URL:', res.Location);
    return fs.remove(filePath)
    .then(() => res.Location);
  })
  .catch(err => {
    return fs.remove(filePath)
    .then(() => Promise.reject(err))
  })
};

export default {upload};