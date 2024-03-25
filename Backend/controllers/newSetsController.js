import StudySetModel from "../models/StudySetModel.js";
import CardModel from "../models/CardModel.js";
import UserModel from "../models/UserModel.js";
import TopicModel from "../models/TopicModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createStudySetsAndCards = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { topic, title, description, createdBy, cards } = req.body;
    
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else if (!Array.isArray(cards) || cards.length === 0) {
      return res.status(400).json({
        error: "Invalid format for flashcards. Expecting a non-empty array.",
      });
    }
    try {
      const savedCards = await Promise.all(
        cards.map(async (cardData) => {

          if (cardData.image ) {
            const cloudinaryLink = await cloudinary.uploader.upload(cardData.image);
            const newCard = new CardModel({question:cardData.question, answer:cardData.answer, image:cloudinaryLink.secure_url});
            return await newCard.save();
          }
          const newCard = new CardModel({question:cardData.question, answer:cardData.answer, image:""});
          return await newCard.save();
        })
        );
        
      let topicObject;
      if (topic && typeof topic === "string") {
        // Find or create topic
        topicObject = await TopicModel.findOne({
          title: { $regex: new RegExp(topic, "i") },
        });
        if (!topicObject) {
          topicObject = await TopicModel.create({ title: topic });
        }
      } else {
        throw new Error("Invalid topic data");
      }

      const newStudySet = new StudySetModel({
        title,
        description,
        createdBy,
        cards: savedCards.map((card) => card._id),
      });

      const savedStudySet = await newStudySet.save();

      topicObject.studySets.push(savedStudySet._id);
      await topicObject.save();

      user.savedStudySets.push({
        topic: topicObject._id,
        studySet: savedStudySet._id,
        cards: savedCards.map((card) => ({
          card: card._id,
          question: card.question,
          answer: card.answer,
        })),
      });

      await user.save();

      res.status(201).json({
        message: "Flashcards created successfully",
        flashcards: {
          topicTitle: topic.title,
          title,
          description,
          cards: user.savedStudySets[user.savedStudySets.length - 1].cards,
        },
      });
    } catch (error) {
      console.error("Error in saving study set:", error);
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ error: "StudySet with the given title already exists." });
      } else {
        return res
          .status(500)
          .json({ error: "Internal server error from backend" });
      }
    }
  } catch (error) {
    console.error(error);
    console.log("Error in backend, in catch");
    return res
      .status(500)
      .json({ error: "Internal server error from backend catch" });
  }
};

export const editStudySet = async (req, res) => {
  const userId = req.params.userId;
  const topicId = req.params.topicId;
  const studySetId = req.params.studySetId;
  const { topicTitle, title, description, cards } = req.body;
 
  try {
    const studySet = await StudySetModel.findByIdAndUpdate(
      studySetId,
      {
        title: title,
        description: description,
      },
      { new: true }
    );
    
    if (!studySet) {
      console.error("Study set not found");
      return res.status(404).json({ error: "Study set not found" });
    }

const updatedCardsPromises = cards.map(async (eachCard) => {
  const cardId = eachCard.cardId;
  const status = eachCard.status || "not studied"; 
  
  if (!cardId) {
    try {
      const newCard = await CardModel.create(eachCard);

      await StudySetModel.findByIdAndUpdate(studySetId, {
        $push: { cards: newCard._id },
      });

      await UserModel.findByIdAndUpdate(userId, {
        $push: {
          
          "savedStudySets.$[elem].cards": {
            card: newCard._id,
            status: status,
          },
        },
      }, {
        arrayFilters: [{"elem.studySet": studySetId}]
      });

      return newCard;
    } catch (error) {
      console.error("Error creating and updating new card:", error.message);
      return null;
    }
  } else {
    try {
      let updateFields = {
        question: eachCard.question,
        answer: eachCard.answer,
      };
      if (eachCard.image) {
        const cloudinaryLink = await cloudinary.uploader.upload(eachCard.image);
        updateFields.image = cloudinaryLink.secure_url;
      }

      const foundCard = await CardModel.findByIdAndUpdate(
        cardId,
        {
          $set: updateFields,
        },
        { new: true }
      );

      if (!foundCard) {
        console.error("Card not found");
        return null;
      }
      return foundCard;
    } catch (error) {
      console.error("Error updating card:", error.message);
      return null;
    }
  }
});

const updatedCards = (await Promise.all(updatedCardsPromises)).filter(card => card !== null);

    const updatedTopic = await TopicModel.findByIdAndUpdate(
      topicId,
      {
        $set: {
          title: topicTitle,
        },
      },
      { new: true }
    );

    if (!updatedTopic) {
      console.error("Topic not found");
      return res.status(404).json({ error: "Topic not found" });
    }
    res.status(201).json({
      topicTitle: topicTitle,
      title: studySet.title,
      description: studySet.description,
      cards: updatedCards,
      message: "Flashcards updated successfully",
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCard = async (req, res) => {
  const userId = req.params.userId;
  const studySetId = req.params.studySetId;
  const cardId = req.params.cardId;

  try {
    await CardModel.findByIdAndDelete(cardId).then(async (deletedCard) => {
      const studySetAfterDel = await StudySetModel.findByIdAndUpdate(
        studySetId,
        { $pull: { cards: cardId } },
        { new: true }
      );
      const userAfterDel = await UserModel.findByIdAndUpdate(
        userId,
        {
          $pull: {
            "savedStudySets.$[elem].cards": {
              card: cardId,
            },
          },
        },
        {
          arrayFilters: [{ "elem.studySet": studySetId }],
          new: true,
        }
      );
      res.status(200).json({ message: "Card deleted successfully" });
    });
  } catch (error) {
    console.error("Error deleting card:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSavedStudySetInEdit = async (req, res) => {
  const userId = req.params.userId;
  const studySetId = req.params.setId;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const studySetIndex = user.savedStudySets.findIndex(
      (set) => set.studySet.toString() === studySetId
    );
    if (studySetIndex === -1) {
      return res.status(404).send("Study set not found in saved study sets");
    }
    user.savedStudySets.splice(studySetIndex, 1);
    await user.save();
    return res.status(200).send("Study set deleted successfully");
  } catch (error) {
    console.error("Error deleting study set:", error);
    return res.status(500).send("Internal Server Error");
  }
};
