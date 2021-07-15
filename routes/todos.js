import express from 'express'

import { getTodos, createTodo, updateTodo, deleteTodo, likeTodo } from '../controllers/todos.js'

const router = express.Router()

router.get('/', getTodos)
router.post('/', createTodo)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)
router.patch('/:id/likeTodo', likeTodo)

export default router 
