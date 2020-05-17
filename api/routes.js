// require the handlers
const handlers = require('./handlers.js');
const express = require('express');

// build the router
const router = express.Router();

router.get('/', (req, res) => {
  res.send('files API!');
});

// add routes to router
router.get('/files', handlers.getfiles);

// read a file
//  called by action: fetchAndLoadFile
router.get('/files/:name', handlers.readFile);

// write a file
//  called by action: saveFile
router.post('/files/:name', handlers.writeFile);

// delete a file
//  called by action: deleteFile
router.delete('/files/:name', handlers.deleteFile);

// ..... to here ------
// export the router
module.exports = router;