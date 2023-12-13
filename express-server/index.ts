import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.EXPRESS_PORT || 8000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Lending Library API Server');
});

app.get('/books/:borrowed', async (req: Request, res: Response) => {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({host:process.env.DB_HOST, user:process.env.DB_USER, password:process.env.DB_PASS, database: 'library'});
  const bBorrowed = Number.parseInt(req.params.borrowed);
  const whereClause = bBorrowed === 1 ? ' where borrowed = 1 ' : '' ;
  const sql = `SELECT title, author, TO_BASE64(cover_image) as cover_image, borrowed FROM book ${whereClause} ORDER BY title`;
  const [rows, fields] = await connection.execute(sql); 
  res.send(rows);
});

app.put('/books/borrow/:title', async (req: Request, res: Response) => {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({host:process.env.DB_HOST, user:process.env.DB_USER, password:process.env.DB_PASS, database: 'library'});
  const updateCmd = 'update book set borrowed = 1 where title =  "' + req.params.title + '"';
  await connection.execute(updateCmd);
  res.send('Book borrowed');
});

app.put('/books/return/:title', async (req: Request, res: Response) => {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({host:process.env.DB_HOST, user:process.env.DB_USER, password:process.env.DB_PASS, database: 'library'});
  const updateCmd = 'update book set borrowed = 0 where title =  "' + req.params.title + '"';
  await connection.execute(updateCmd); 
  res.send('Book returned');
});

app.listen(port, () => {
  console.log(`Lending Library API Server is at http://localhost:${port}`);
});
