const fs = require('fs');
const path = require('path');
const config = require('../config');
const util = require('util');
// some helper functions you can use
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readDir = util.promisify(fs.readdir);
const deleteFile = util.promisify(fs.unlink);
// define FILES_DIR
const FILES_DIR = path.join(path.join(__dirname, '../'), config.FILES_DIR);
// declare the handlers
const handlers = {
    getfiles: (req, res, next) => {
        console.log(FILES_DIR);
        readDir(FILES_DIR)
            .then((list) => { console.log(list); res.json(list); })
            .catch((err) => {
                if (err && err.code === 'ENOENT') {
                    res.status(404).end();
                    return;
                }
                if (err) {
                    next(err);
                    return;
                }
            });
    },
    readFile: (req, res, next) => {
        const fileName = req.params.name;
        readFile(`${FILES_DIR}\\${fileName}`, 'utf-8')
            .then((fileText) => {
                const responseData = {
                    name: fileName,
                    text: fileText,
                };
                res.json(responseData);
            })
            .catch((err) => {
                if (err && err.code === 'ENOENT') {
                    res.status(404).end();
                    return;
                }
                if (err) {
                    next(err);
                    return;
                }
            });
    },
    writeFile: (req, res, next) => {
        const fileName = req.params.name;
        const fileText = req.body.text;
        writeFile(`${FILES_DIR}\\${fileName}`, fileText)
            .then(() => {
                // refactor hint:
                res.redirect(303, '/api/files');
                //handlers.getFiles;
            })
            .catch((err) => {
                if (err && err.code === 'ENOENT') {
                    res.status(404).end();
                    return;
                }
                if (err) {
                    next(err);
                    return;
                }
            });

    },
    deleteFile: (req, res, next) => {
        const fileName = req.params.name;
        console.log(fileName);
        const pathUrl = path.join(path.join(__dirname, '../'), config.FILES_DIR, fileName);
        console.log(pathUrl);
        deleteFile(pathUrl)
            .then(() => {
                // refactor hint:
                res.redirect(303, '/api/files');
                //handlers.getFiles;
            })
            .catch((err) => {
                if (err && err.code === 'ENOENT') {
                    res.status(404).end();
                    return;
                }
                if (err) {
                    next(err);
                    return;
                }
            });
    }
};

// export the handlers
module.exports = handlers;
