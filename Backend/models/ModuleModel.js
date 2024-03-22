import mongoose from 'mongoose'

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
})

const ModuleModel = mongoose.model('Module', ModuleSchema)

export default ModuleModel
