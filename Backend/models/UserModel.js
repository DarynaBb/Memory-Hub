import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  firstName: {type: String},
  lastName: {type: String},
  photo: {type: String, default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"},
  nickName: {type: String, unique: true},
  verificationToken: { type: String },
  verified: { type: Boolean, default: false },
  savedStudySets: [{
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
    studySet: { type: mongoose.Schema.Types.ObjectId, ref: "StudySet" },
    savedAt: { type: Date, default: Date.now },
    cards: [{
      card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
      status: { type: String, enum: ["not studied", "need practice", "mastered"], default: "not studied" }
    }],
    edit: {type: String, default: "yes" }
  }]
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;