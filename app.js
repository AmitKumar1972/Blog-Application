const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
const routes=require('./src/routes/routes');
const morgan=require('morgan');
const logger=require('./logger');

const userController=require('./src/Controller/userController');
const blogController=require('./src/Controller/blogController');

app.use(morgan('tiny'));

app.use(express.json());
app.use('/api',routes);

app.listen(3000,()=>{
    logger.info('server is running');
});
