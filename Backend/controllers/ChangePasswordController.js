import bcrypt from 'bcrypt';
import "dotenv/config";
import UserModel from "../models/UserModel.js"

export const postChangePasswordController = async (req, res) => { 
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    try {
        // Finde den Benutzer anhand der userId
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send({ success: false, error: 'Benutzer nicht gefunden' });
        }

        // Überprüfe, ob das alte Passwort korrekt ist
        const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isCorrectPassword) {
            return res.status(401).send({ success: false, error: 'Altes Passwort ist nicht korrekt' });
        }

        // Hashen und speichern des neuen Passworts
        const saltedHashedPassword = await bcrypt.hash(newPassword, 14);
        user.password = saltedHashedPassword;
        await user.save();

        // Rückgabe des Erfolgs
        return res.status(200).send({ success: true, message: 'Passwort erfolgreich geändert' });
    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, error: error.message });
    }
}
