//ADD ALL NECESSARY ELEMENTS FOR THE BACKEND APP

//USE 3001 AS PER MODULE FOR ROUTING, ADD/DECLARE ELEMENTS AS PER MODULE 
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const noteItems = require('./db/db.json');

//INTIALIZE GET METHODS AS PER ASSIGNMENT REQUIREMENTS, UTILIZE MODULE METHOD EXAMPLE 
app.get('/', (req, res) => {res.sendFile(path.join(__dirname, './public/index.html'));});
app.get('*', (req, res) => {res.sendFile(path.join(__dirname, './public/index.html'));});
app.get('/notes', (req, res) => {res.sendFile(path.join(__dirname, './public/notes.html'));});
app.get('/api/notes', (req, res) => {res.json(noteItems);});
//app.get('/api/notes', (req, res) => {res.json(noteItems.slice(1));});

//ADD ELEMENT FUNCTION
function addElement(note, array) {
    
    note.id = array[0];
    array.push(note);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(array, null, 2));
    return note;
}
//POST ELEMENT UTILIZING THE addElement FUNCTION
app.post('/api/notes', (req, res) => {res.json(addElement(req.body, noteItems));});
//BONUS DELETE 

//DELETE ELEMENT BASED ON ID 
function deleteElement(id, array) {
    //FOR LOOP WHICH GOES THROUGH EACH ITEM IN THE ARRAY 
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) {
            //GET ONLY THAT ONE ELEMENT IN THE ARRAY USING THE SPLICE METHOD
            array.splice(i, 1);
            //FS WRITE FILE 
            fs.writeFileSync(path.join(__dirname, './db/db.json'),JSON.stringify(array, null, 2));
            //BREAK ONCE THE DESIRED ELEMENT HAS BEEN DELETED 
            break;
        }
    }
}
//DELETE ELEMENT BASED OFF OF ID 
app.delete('/api/notes/:id', (req, res) => {deleteElement(req.params.id, noteItems);res.json(true);});
//LISTEN METHOD FOR SERVER Express.js, AS PER MODULE 
app.listen(PORT, () => {console.log(`API server now on port ${PORT}!`);});