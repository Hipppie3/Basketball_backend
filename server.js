import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';

const app = express();
const PORT = 5001;
app.use(cors());

app.listen(PORT, () => {
 console.log("Hello World")
});

app.get('/', (req, res) => {
 res.send('server is running successfully')
});