const express = require('express')
const SelectedTM = require('../models/selectedTMModel')

const mongoose = require('mongoose')


// load selected tournament
const loadSelectedTM = async (req, res) => {
    const select = await SelectedTM.find({})
    const {_id} = select[0]
    const selected = await SelectedTM.find({_id: _id}).populate({path: 'TMID', select: ['name']})
    const {TMID} = selected[0]

    res.status(200).json(TMID)
}
// update selected tournament
const updateSelectedTM = async (req, res) => {
    const {_id} = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: "Invalid ID"})
    }
    const select = await SelectedTM.find({})
    const {_id: id} = select[0]

    const selected = await SelectedTM.findOneAndUpdate({_id: id}, {
        TMID: _id
    })

    if (!selected){
        return res.status(400).json({error: "Not selected"})
    }

    const newSelected = await SelectedTM.find({_id: id}).populate({path: 'TMID', select: ['name']})
    const {TMID} = newSelected[0]
    res.status(200).json(TMID)

}

const router = express.Router()

// GET the selected tournament
router.get('/', loadSelectedTM)
// UPDATE the selected tournament
router.patch('/', updateSelectedTM)


module.exports = router