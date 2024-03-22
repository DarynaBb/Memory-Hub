import TopicModel from "../models/TopicModel.js";
import StudySetModel from "../models/StudySetModel.js";

export const addTopic = async (req, res) => {
  try {
    const newTopic = new TopicModel(req.body);
    await newTopic.save();
    res.status(201).send("new Topic added");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStudySetToTopic = async (req, res) => {
  const topicId = req.params.id;
  const studySetId = req.body.studySetId;
  try {
    await TopicModel.findByIdAndUpdate(topicId, {
      $push: { studySets: studySetId },
    });
    res.status(200).json("StudySet added to topic");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Diese Funktion fügt alle StudySets mit ihren Karten zu einem Topic hinzu
import { createStudySetsAndCards } from "./newSetsController.js";

export const addAllStudySetsWithCardsToTopic = async (req, res) => {
  const topicId = req.params.id;
  const studySets = req.body;

  try {
    const studySetIds = await createStudySetsAndCards(studySets);

    if (studySetIds.length > 0) {
      console.log("studySetIds: ", studySetIds);
      await TopicModel.findByIdAndUpdate(topicId, {
        $push: { studySets: { $each: studySetIds } },
      });
      res.status(200).json("StudySets added to topic");
    } else {
      throw new Error("No StudySets were created");
    }
  } catch (error) {
    console.error("Error adding StudySets to topic:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export async function getTopicIdByTitle(req, res) {
  try {
    const title = req.params.title;
    const topic = await TopicModel.findOne({ title });

    console.log("topic:", topic);
    res.status(200).json(topic._id);

    return topic._id;
  } catch (error) {
    console.error("Error getting topic by title:", error.message);
    throw error;
  }
}
