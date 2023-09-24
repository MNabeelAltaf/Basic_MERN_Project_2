const mongoose = require('mongoose');


// defining schema and data-types
const Data = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}
)

// collection name = registeration_data
const collection = mongoose.model("user_data_collection", Data);

module.exports = collection;