const express = require('express')

const {
    getMatches,
    addMatch,
    deleteMultipleMatches
} = require('../controllers/matchController')

const router = express.Router()

// GET all matches
router.get('/', getMatches)
// POST a new match
router.post('/', addMatch)
// DELETE Multiple matches
router.delete('/', deleteMultipleMatches)


module.exports = router