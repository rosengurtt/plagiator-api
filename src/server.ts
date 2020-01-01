import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import { PORT } from "./settings";
import {postUploadFile} from './services/uploads/uploadController';

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const router = express();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
router.post('/api/uploads', upload.single('musicFile'), postUploadFile)

const server = http.createServer(router);
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);


server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);

const db = require('./models/db');