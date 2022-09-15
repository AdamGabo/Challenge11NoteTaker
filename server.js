//ADD ALL NECESSARY ELEMENTS FOR THE BACKEND APP

//USE 3001 AS PER MODULE FOR ROUTING, ADD/DECLARE ELEMENTS AS PER MODULE 
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const { notes } = require('./db/db.json');
//const noteItems = require('./db/db.json');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//INTIALIZE GET METHODS AS PER ASSIGNMENT REQUIREMENTS, UTILIZE MODULE METHOD EXAMPLE 
app.get('/api/notes', (req, res) => {res.json(notes);});
app.get('/', (req, res) => {res.sendFile(path.join(__dirname, './public/index.html'));});
app.get('/notes', (req, res) => {res.sendFile(path.join(__dirname, './public/notes.html'));});
app.get('*', (req, res) => {res.sendFile(path.join(__dirname, './public/index.html'));});

function addElement(notes, body) {
    const note = body;
    notes.id = body[0]; 
    notes.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({notes}, null, 2));
    return note;
}
//POST ELEMENT UTILIZING THE addElement FUNCTION
function validateNotes(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
        return true;
}

app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
    if (!validateNotes(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = addElement(notes,req.body);
        res.json(note);
    }
});
//BONUS DELETE 

//DELETE ELEMENT BASED ON ID 
function deleteElement(id, body) {
    //FOR LOOP WHICH GOES THROUGH EACH ITEM IN THE body 
    for (let i = 0; i < body.length; i++) {
        if (body[i].id == id) {
            //GET ONLY THAT ONE ELEMENT IN THE ARRAY USING THE SPLICE METHOD
            body.splice(i, 1);
            //FS WRITE FILE 
            fs.writeFileSync(path.join(__dirname, './db/db.json'),JSON.stringify(body, null, 2));
            //BREAK ONCE THE DESIRED ELEMENT HAS BEEN DELETED 
            break;
        }
    }
}
//DELETE ELEMENT BASED OFF OF ID 
app.delete('/api/notes/:id', (req, res) => {deleteElement(req.params.id, notes);res.json(true);});
//LISTEN METHOD FOR SERVER Express.js, AS PER MODULE 
app.listen(PORT, () => {console.log(`port: ${PORT}!`);});