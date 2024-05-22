const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const mongoose = require('mongoose');
const Task = require('./models/Task.model');
const bodyParser = require("body-parser");

// connect with mongoose
mongoose
.connect("mongodb://localhost:27017/to-do-app")
.then(() => console.log('Connected to the database'))
.catch((err) => console.log(err));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use('/public', express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.urlencoded({ extended: true }));
hbs.registerHelper('eq', function (a, b) {
    return a === b;
});


// Página general con toda la lista de tareas
app.get('/', (req, res) => {
    Task.find()
    .then((data) => {
      res.render('index', { tasks : data});  
    });
    
});

// Página para crear tarea nueva
app.get('/create-task', (req, res) => {
    res.render('create-task');
})

app.post("/create-task", (req, res) => {
    Task.create(req.body)
      .then((data) => {
        console.log(data)
        res.redirect("/");
      })
      .catch((error) => console.log(error));
  });

//Página con una tarea concreta
app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id)
    .then(data => {
    console.log(data);
    res.render('task', {task : data});
    })
});

app.listen(3000, () => console.log("Server listening in port 3000"));