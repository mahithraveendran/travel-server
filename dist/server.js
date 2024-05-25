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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./app/config");
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        server = app_1.default.listen(config_1.config.port, () => {
            console.log(`Server is running on port ${config_1.config.port}`);
        });
    });
}
// run main server
main();
// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`😈 unhandled Rejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`😈 uncaught Exception is detected , shutting down ...`, err);
    process.exit(1);
});
