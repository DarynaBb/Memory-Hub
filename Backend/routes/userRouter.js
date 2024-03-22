import express from "express";
import { addStudySetToUser, getUserShortData, deleteSavedStudySet, deleteUserAccount, getUserInfo, updateCardStatus, updateUser, updateUserPhoto, getUserStudySets} from "../controllers/userController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import isAuth from "../middleware/isAuth.js";
import { postChangePasswordController } from "../controllers/ChangePasswordController.js";

const router = express.Router();

router
  .patch("/users/:userId/topics/:topicId/studySets/:studySetId", addStudySetToUser)
  .get("/user", isAuth, getUserInfo)
  .get("/users/:id", getUserShortData)
  .get("/user/:id/studySets", getUserStudySets)
  .delete("/user/:userId/:setId", deleteSavedStudySet)
  .patch("/user/:userId/:studySetId/:cardId", updateCardStatus)
  .patch("/user/:id", updateUser)
  .post("/user/changePassword/:id", postChangePasswordController)
  .post("/user/uploadPhoto/:id", updateUserPhoto)
  .delete("/user/:id", deleteUserAccount);
  

export default router;
