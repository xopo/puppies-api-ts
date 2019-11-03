"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var puppies_1 = require("./middleware/puppies");
// initialize config based on .env
dotenv_1.default.config();
var app = express_1.default();
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
var port = process.env.SERVER_PORT || 8083;
app.get('/', function (_req, res) {
    res.send('Hello Buba3!');
});
app.get('/puppies', puppies_1.getPuppies, function (_req, res) {
    var puppies = res.locals.puppies;
    res.json(puppies);
});
app.get('/puppy/:id', puppies_1.getPuppy, function (_req, res) {
    var puppy = res.locals.puppy;
    res.json(puppy);
});
app.listen(port, function () {
    // tslint:disable-next-line:no-console
    console.log("server starterd at http://localhost:" + port);
});
//# sourceMappingURL=index.js.map