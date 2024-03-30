import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to mongodb');
}).catch((err)=>{
    console.log(err);
});

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

// routes middleware
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')));


app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});

app.listen(3000, ()=>{
    console.log('server is running in port 3000');
})