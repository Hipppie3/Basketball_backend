import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize from './config/database.js';
import playerRoutes from './routes/playerRoute.js';
import userRoutes from './routes/userRoute.js';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
 console.log("Hello World")
});

app.get('/', (req, res) => {
 res.send('server is running successfully')
});

app.use('/players', playerRoutes);
app.use('/users', userRoutes);

sequelize.authenticate()
.then(() => {
 console.log("database connection successful");
 return sequelize.sync({alter: true});
})
.then(() =>console.log("models syncrhonized with database"))
.catch((err) => console.log("Unable to connect", err));