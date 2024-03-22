import express from "express";
import {
  addModule,
  addTopicToModule,
  getAllModules,
  getModuleInfo,
  updateModuleIcon,
} from "../controllers/moduleController.js";
import {
  addTopic,
  addStudySetToTopic,
  addAllStudySetsWithCardsToTopic,
} from "../controllers/topicController.js";
import {
  addCardToStudySet,
  addCardsToStudySet,
  addStudySet,
  getAllStudyData,
} from "../controllers/studySetController.js";
import { addCard } from "../controllers/cardController.js";
import {
  createStudySetsAndCards,
  editStudySet,
  deleteCard,
  deleteSavedStudySetInEdit,
} from "../controllers/newSetsController.js";

const router = express.Router();

router
  .post("/modules", addModule)
  .get("/modules", getAllModules)
  .get("/modules/:id", getModuleInfo)
  .patch("/module/:id", updateModuleIcon)
  .get("/topics", getAllStudyData)
  .post("/topics", addTopic)
  .patch("/modules/:id", addTopicToModule)
  .post("/studySets", addStudySet)
  .patch("/topics/:id", addStudySetToTopic)
  .post("/cards", addCard)
  .patch("/studySets/:id", addCardsToStudySet)
  .patch("/addAllStudySets/:id", addAllStudySetsWithCardsToTopic)
  .post("/createSet/:userId", createStudySetsAndCards)
  .patch("/editSet/:userId/:topicId/:studySetId", editStudySet)
  .delete("/deleteCard/:userId/:studySetId/:cardId", deleteCard)
  .delete("/:userId/:setId", deleteSavedStudySetInEdit)

export default router;