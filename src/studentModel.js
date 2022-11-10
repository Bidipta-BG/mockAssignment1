let mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId

let studentSchema = mongoose.Schema({
    name: {
        type: String
    },
    subject: {
        type: String
    },
    marks: {
        type: String
    }
}, {timestamps: true}
)

module.exports = mongoose.model('student', studentSchema)