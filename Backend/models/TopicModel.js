import mongoose from 'mongoose'

const TopicSchema = new mongoose.Schema({
  title: {
    type: String
  },
  studySets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudySet' }],
})

const TopicModel = mongoose.model('Topic', TopicSchema)

export default TopicModel

TopicModel.collection.dropIndexes((err, result) => {
  if (err) {
    console.error("Error dropping indexes:", err);
  } else {
    console.log("Indexes dropped successfully:", result);
  }
});

