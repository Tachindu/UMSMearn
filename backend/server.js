const express = require('express');
const app = express ();
const cors = require('cors');
const port = 3001;
const host = 'localhost';
const mongoose =require('mongoose');
const router = require('./router');


app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://shasheentachindu:UMSmern@cluster0.lxjqdzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' //'mongodb+srv://shasheentachindu:UMSmern@cluster0.lxjqdzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');       

    }
    catch (error){
        console.log('MongoDB Error: ', error);
    }
};

connect();


const server = app.listen(3001, '0.0.0.0', () => {
    console.log(`Node server is listning to ${server.address().port}`)
});

app.use('/api', router);


/*const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const host = 'localhost';
const mongoose = require('mongoose');
const router = require('./router');

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://Anjana:psrvlog@cluster0.fiwbnuq.mongodb.net/?retryWrites=true&w=majority';

const connect = async () =>{
    try{
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
    }
    catch(error){
      console.log('MongoDB Error: ', error);
    }
};

connect();

const server = app.listen(port, host, ()=>{
    console.log('Node sever is listening to ${server.address().port}')
});

app.use('/api', router);*/