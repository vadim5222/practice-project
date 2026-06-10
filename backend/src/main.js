const express = require('express');
const passport = require('passport');
const app = express()


app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build API', completed: false },
];

app.get('/todos', (req, res) => res.json(todos))

app.listen(3000, () => console.log('Сервен запущен на порту 3000'))