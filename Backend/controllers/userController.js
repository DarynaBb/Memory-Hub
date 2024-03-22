import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import StudySetModel from "../models/StudySetModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import formidable from "formidable";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getUserInfo = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).send("Unauthorized");
    }
    const loggedUser = await UserModel.findById(req.userId).populate({
      path: "savedStudySets",
      populate: [
        { path: "topic", model: "Topic" },
        { path: "studySet", model: "StudySet" },
        { path: "cards.card", model: "Card" },
      ],
    });

    if (!loggedUser) {
      return res.status(404).send("User not found");
    }
    res.send({
      firstName: loggedUser.firstName,
      lastName: loggedUser.lastName,
      nickName: loggedUser.nickName,
      _id: loggedUser._id,
      email: loggedUser.email,
      photo: loggedUser.photo,
      savedStudySets: loggedUser.savedStudySets,
    });
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getUserStudySets = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId).populate({
      path: "savedStudySets",
      populate: [
        { path: "topic", model: "Topic" },
        { path: "studySet", model: "StudySet" },
        { path: "cards.card", model: "Card" },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ savedStudySets: user.savedStudySets });
  } catch (error) {
    console.error("Error fetching saved study sets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addStudySetToUser = async (req, res) => {
  const userId = req.params.userId;
  const topicId = req.params.topicId;
  const studySetId = req.params.studySetId;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).send("User not found");
    }
    const existingSavedStudySetIndex = user.savedStudySets.findIndex(
      (savedStudySet) => savedStudySet.studySet.equals(studySetId)
    );

    if (existingSavedStudySetIndex !== -1) {
      res.status(400).send("Study set already saved by the user");
    } else {
      const studySet = await StudySetModel.findById(studySetId);
      if (!studySet) {
        res.status(404).send("Study set not found");
      } else {
        const savedStudySet = {
          topic: topicId || "Your topic",
          studySet: studySetId,
          savedAt: Date.now(),
          cards: studySet.cards.map((card) => ({ card: card._id })),
          edit: req.body.edit,
        };

        await StudySetModel.findOneAndUpdate(
          { _id: studySetId },
          { $inc: { shared: 1 } }
        );

        user.savedStudySets.push(savedStudySet);
        await user.save();
        res.status(200).send(user);
      }
    }
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteSavedStudySet = async (req, res) => {
  const userId = req.params.userId;
  const studySetId = req.params.setId;
  //console.log(userId, studySetId)
  try {
      await UserModel.findByIdAndUpdate(userId, {
        $pull: { savedStudySets: { _id: studySetId } }
    });
    const updatedUser = await UserModel.findById(userId);
      res.status(200).send("Study set deleted successfully");
  } catch (error) {
      console.error('Error deleting study set:', error.message);
      res.status(500).send("Internal Server Error");
  }
};

export const updateCardStatus = async (req, res) => {
  const userId = req.params.userId;
  const studySetId = req.params.studySetId;
  const cardId = req.params.cardId;
  const newStatus = req.body.newStatus;
  // console.log("USERId:", userId);
  // console.log("StudySet:", studySetId);
  // console.log("CardId:", cardId);
  // console.log("Nes Status:", newStatus);

  try {
    // Find the user by userId and update the card
    const user = await UserModel.findById(userId);
    console.log("User:", user);
    const updatedUser = await UserModel.findOneAndUpdate(
      {
        _id: userId,
        "savedStudySets._id": studySetId,
        "savedStudySets.cards._id": cardId,
      },
      {
        $set: {
          "savedStudySets.$[set].cards.$[card].status": newStatus,
        },
      },
      {
        new: true,
        arrayFilters: [{ "set._id": studySetId }, { "card._id": cardId }],
      }
    );
    //console.log("User:", updatedUser);
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error("Error retrieving user information:", error);
    res.status(500).send("Internal Server Error");
  }
};

      export const updateUser = async (req, res) => {
        const userId = req.params.id;
        const { email, firstName, lastName } = req.body;
    
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(404).send(`No user with id: ${userId}`);
        }
    
        try {
          let updatedUser = { email, firstName, lastName };   
          updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUser, { new: true });
          res.status(200).send(updatedUser);
        } catch (error) {
          console.error("Error updating user:", error);
          res.status(500).send("Internal Server Error");
        }
    };

    export const updateUserPhoto = async (req, res) => {
      const userId = req.params.id;
      const form = formidable({});
      const [fields, files] = await form.parse(req);
      let photoUrl;
    
      try {
        // Überprüfen, ob ein Foto hochgeladen wurde
        if (files.photo) {
          const filePath = files.photo[0]?.filepath;
          // Bild mit Cloudinary hochladen
          const result = await cloudinary.uploader.upload(filePath);
          // URL des hochgeladenen Bildes erhalten
          photoUrl = result.secure_url;
        } else if (fields.photoUrl) {
          // Wenn kein Foto hochgeladen wurde, aber eine URL im Formularfeld übergeben wurde
          photoUrl = fields.photoUrl.toString();
        }
      } catch (err) {
        console.error(err);
      }
      
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).send(`No user with id: ${userId}`);
      }
    
      try {
        // Aktualisierten Benutzer mit dem neuen Profilbild erstellen
        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          { photo: photoUrl },
          { new: true }
        );
        res.status(200).send(updatedUser);
      } catch (error) {
        console.error("Error updating user Photo:", error);
        res.status(500).send("Internal Server Error");
      }
    };    

    export const deleteUserAccount = async (req, res) => {
      const userId = req.params.id;
      try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        res.status(200).send(deletedUser);
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
      }
  };
    

      export const getUserShortData = async (req, res) => {
        const userId = req.params.id;

        try {
          const user = await UserModel.findById(userId);
  
          if (!user) {
              return res.status(404).send("User not found"); 
          }
          res.send({
              nickName: user.nickName,
              photo: user.photo
            });
  
      } catch (error) {
          console.error("Error retrieving user information:", error);
          res.status(500).send("Internal Server Error"); 
      }
      }