"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bandController_1 = require("./bandController");
exports.default = [
    {
        path: "/api/bands",
        method: "get",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                if (req.query.styleId) {
                    const result = yield bandController_1.getAllBandsForStyle(req.query.styleId);
                    res.status(200).send(result);
                }
                else {
                    const result = yield bandController_1.getAllBands();
                    res.status(200).send(result);
                }
            })
        ]
    }
];
//# sourceMappingURL=routes.js.map