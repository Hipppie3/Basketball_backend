import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import playerRoutes from './routes/playerRoute.js';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
 console.log("Hello World")
});

app.get('/', (req, res) => {
 res.send('server is running successfully')
});

app.use('/players', playerRoutes);

sequelize.authenticate()
.then(() => {
 console.log("database connection successful");
 return sequelize.sync({alter: true});
})
.then(() =>console.log("models syncrhonized with database"))
.catch((err) => console.log("Unable to connect", err));