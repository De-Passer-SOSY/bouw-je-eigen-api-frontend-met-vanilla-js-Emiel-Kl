const express = require('express');
const cors = require('cors');
const db = require('./services/db');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/chessChampions', async (req, res) => {
    try{
        const chessChampions = await db('wereldkampioenen');
        res.status(200).json(chessChampions);
    }catch{
        res.status(500).json({message:'internal server error'});
    }
})

app.listen(3333);
console.log('Server is running on port 3333');