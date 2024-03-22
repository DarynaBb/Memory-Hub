import CardModel from "../models/CardModel.js";


export const addCard = async (req, res) => {
    try {
      const newCard = new CardModel(req.body)
      await newCard.save()
      res.status(201).send('new Card added'+ newCard)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
