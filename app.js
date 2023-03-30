const express = require("express");
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');


//Load in the mongoose models
const { List, Task } = require('./db/models');

//Load Middleware
app.use(bodyParser.json());

/* Route Handler */

/* List Routes */

/**
 * Get /list
 * Purpose: Get all List
 */


app.get('/list', (req, res) => {
    //We want to return array of all list in th the database
    List.find({}).then((list) => {
        res.send(list);
    })
})

/**
 * Post /list
 * Purpose: Create a list
 */

app.post('/list', (req, res) => {
    //We want to Create a new list and return the new list back
    //The list information field will be passed in via the JSON request body
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        //the full List document is returned (incl id)
        res.send(listDoc)
    })
})

/**
 *PATH /list/:id
 *Purpose : update a Specific List  
 */
app.patch('/list/:id', (req, res) => {
    // We want to update the specific list (list document with id in the url ) with the new values    
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

/**
 *DELETE /list/:id
 *Purpose : Delete a List
 */

app.delete('/list/:id', (req, res) => {
    //We we want to delete the specific list (document with id in the url)
    List.findOneAndRemove({ _id: req.params.id }).then((removedListDocuments) => {
        res.send(removedListDocuments);
    })
})

/**
 * Get /list/:listId/task
 * Purpost: We want to return all the task which belong to specific list (specified by listId)
 */

app.get('/lists/:listId/task', (req, res) => {
    // We want to return all Task that belong to specific List document with(id in the url)    
    Task.find({ _listId: req.params.listId }).then((tasks) => {
        res.send(tasks);
    })
})

// app.get('/lists/:listId/tasks/:taskId', (req, res) => {
//     Task.findOne({
//         _id: req.params.taskId,
//         _listId: req.params.listId
//     }).then((task) => {
//         res.send(task);
//     })
// })



/**
 * Post /list/:listId/task
 * Purpost: Create a new Task in the Specific List
 */

app.post('/lists/:listId/task', (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    })
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc)
    })
})

/**
 * Patch /lists/:listId/tasks/:taskId
 * Purupose: Update an existing Task
 */

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200)
    })
})

/**
 * Delete /lists/:listId/tasks/:taskId
 * Purpose Delete a Task
 */

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findByIdAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTask) => {
        res.send(removedTask);
    })
})





app.listen(4500, () => {
    console.log("Server is listening on port 4500")
})