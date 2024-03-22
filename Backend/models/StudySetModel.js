import mongoose from "mongoose";

const StudySetSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  shared: { type: Number, default: 0 },
  cards: [ { type: mongoose.Schema.Types.ObjectId, ref: "Card" } ],
});

const StudySetModel = mongoose.model("StudySet", StudySetSchema);
 StudySetModel.collection.dropIndexes((err, result) => {
    if (err) {
      console.error("Error dropping indexes:", err);
    } else {
      console.log("Indexes dropped successfully:", result);
    }
  });
  
  

export default StudySetModel;
