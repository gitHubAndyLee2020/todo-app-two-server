import express from 'express'
import mongoose from 'mongoose'

import TodoMessage from '../models/TodoMessage.js'

export const getTodos = async (req,res) => {
    try {
        const todoMessages = await TodoMessage.find()

        res.status(200).json(todoMessages)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createTodo = async (req,res) => {
    const { text } = req.body
    const newTodo = new TodoMessage({ text })
    try {
        await newTodo.save()

        res.status(200).json(newTodo)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const updateTodo = async (req,res) => {
    const { id } = req.params
    const { text } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No todo with id: ${id}`)

    const updatedTodo = { text, _id: id }

    await TodoMessage.findByIdAndDelete(id, updatedTodo, { new: true })

    res.json(updatedTodo)
}

export const deleteTodo = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No todo with id: ${id}`)

    await TodoMessage.findByIdAndRemove(id)

    res.json({ message: 'Todo deleted successfully' })
}

export const likeTodo = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No todo with id: ${id}`)

    const todo = await TodoMessage.findById(id)

    const updatedTodo = await TodoMessage.findByIdAndUpdate(id, { likeCount: todo.likeCount + 1 }, { new: true })

    res.json(updatedTodo)
}