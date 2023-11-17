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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
//For env File 
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Welcome to the Lending Library API Server');
});
app.get('/books/:borrowed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mysql = require('mysql2/promise');
    const connection = yield mysql.createConnection({ host: 'localhost', user: 'api', password: 'password', database: 'library' });
    const bBorrowed = Number.parseInt(req.params.borrowed);
    const whereClause = bBorrowed === 1 ? ' where borrowed = 1 ' : '';
    const sql = `SELECT title, author, TO_BASE64(cover_image) as cover_image, borrowed FROM book ${whereClause} ORDER BY title`;
    const [rows, fields] = yield connection.execute(sql);
    res.send(rows);
}));
app.put('/books/borrow/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mysql = require('mysql2/promise');
    const connection = yield mysql.createConnection({ host: 'localhost', user: 'api', password: 'password', database: 'library' });
    const updateCmd = 'update book set borrowed = 1 where title =  "' + req.params.title + '"';
    yield connection.execute(updateCmd);
    res.send('Book borrowed');
}));
app.put('/books/return/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mysql = require('mysql2/promise');
    const connection = yield mysql.createConnection({ host: 'localhost', user: 'api', password: 'password', database: 'library' });
    const updateCmd = 'update book set borrowed = 0 where title =  "' + req.params.title + '"';
    yield connection.execute(updateCmd);
    res.send('Book returned');
}));
app.listen(port, () => {
    console.log(`Lending Library API Server is at http://localhost:${port}`);
});
