"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const middleware_1 = __importDefault(require("./middleware"));
const errorHandlers_1 = __importDefault(require("./middleware/errorHandlers"));
const services_1 = __importDefault(require("./services"));
const settings_1 = require("./settings");
const uploadController_1 = require("./services/uploads/uploadController");
process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});
const router = express_1.default();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
router.post('/api/uploads', upload.single('musicFile'), uploadController_1.postUploadFile);
const server = http_1.default.createServer(router);
utils_1.applyMiddleware(middleware_1.default, router);
utils_1.applyRoutes(services_1.default, router);
utils_1.applyMiddleware(errorHandlers_1.default, router);
server.listen(settings_1.PORT, () => console.log(`Server is running http://localhost:${settings_1.PORT}...`));
const db = require('./models/db');
//# sourceMappingURL=server.js.map