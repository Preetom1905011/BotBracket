const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defines the structure of data
const selectedTMSchema = new Schema(
  {
    TMID: {type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'}
  }
);

// automatically makes the collection
module.exports = mongoose.model('SelectedTM', selectedTMSchema)