const express = require('express')

const {
    getBots,
    getOneBot,
    addBot,
    deleteBot,
    updateBot,
    deleteMultipleBots
} = require('../controllers/botController')

const router = express.Router()

// GET all participants
router.get('/', getBots)

// GET a single participant
router.get('/:id', getOneBot)

// POST a new participants
router.post('/', addBot)

// DELETE a new participants
router.delete('/:id', deleteBot)

// DELETE multiple participants
router.delete('/', deleteMultipleBots)

// UPDATE a new participants
router.patch('/:id', updateBot)

module.exports = router
