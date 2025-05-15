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
});

app.get("/chessChampion/:id", async (req, res) => {
    try {
        const row = await db("wereldkampioenen").where({ id: req.params.id }).first();
        if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).json({ error: "Kampioen niet gevonden" });
        }
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
});

app.post('/newChessChampion', async (req, res) => {
    const {naam, nationaliteit, jaar} = req.body;

    if (!naam || !nationaliteit || !jaar) {
        return res.status(400).json({error: "Vul alle velden in"});
    }
    try {
        const [id] = await db("wereldkampioenen").insert({naam, nationaliteit, jaar});
        res.status(201).json({
            message: "Succesvol toegevoegd",
            id: id
        })
    }catch(error){
        res.status(500).json({error: "Fout bij het toevoegen van de kampioen"});
    }
});

app.put("/updateChessChampion/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const {naam, nationaliteit, jaar} = req.body;

    if(!naam || !nationaliteit || !jaar){
        return res.status(400).json({error: "Vul alle velden in"});
    }
    try{
        const count = await db("wereldkampioenen")
            .where({  id })
            .update({naam, nationaliteit, jaar});

        if (count === 0){
            res.status(404).json({error: "kampioen niet gevonden"});
        }

        const updated = await db("wereldkampioenen").where({  id }).first();

        res.status(200).json({
            message: "kampioen bijgewerkt",
            updated: updated});
    }catch(error) {
        res.status(500).json({error: "Fout bij het updaten van de wereldkampioen"});
    }
})

app.delete("/deleteChessChampion/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try{
        const deleted = await db("wereldkampioenen").where("id", id).del();
        if(deleted === 0){
            res.status(404).json({error: "Afwezigheid niet gevonden"});
        }
        else{
            res.status(200).json({message: "Afwezigheid verwijderd"});
        }
    }catch{
        res.status(500).json({message: "internal server error"});
    }
})

app.listen(3333);
console.log('Server is running on port 3333');