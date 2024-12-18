const express = require('express');
const router = express.Router();
const { getTodos, addTodo, updateTodo, deleteTodo, setTodoTerminate, getStatistics } = require('../controllers/todosController');
const { auth } = require('../middleware/authentication');

router.get('/', auth, getTodos);
router.post('/', auth, addTodo);
router.put('/:id', auth, updateTodo);
router.delete('/:id', auth, deleteTodo);
router.post('/:id', auth, setTodoTerminate);
router.get('/statistics', auth, getStatistics)
module.exports = router;
