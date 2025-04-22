import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mcqRoutes from './routes/mcqRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'Server Online' }));
app.use('/api', mcqRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
