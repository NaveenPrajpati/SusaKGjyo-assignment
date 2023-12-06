import { configDotenv } from 'dotenv';
import express from 'express';
import routes from './routes/crudRoutes.js';
import cors from 'cors'
const app =express();

app.use(express.json());
app.use(cors())

configDotenv()




app.use('/api',routes)
app.get('/',(req,res)=>{
    res.send("Hi");
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});