import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret_key";

export default (req, res, next) => {
    const token = req.cookies?.jwt;
   // console.log("Cookies", req.cookies)
    //console.log("Token", token)
    if (!token) {
        console.log("Token not found");
        return res.status(401).send({ error: "No token provided" });
    }

    try {
        const decodedPayload = jwt.verify(token, JWT_SECRET);
        req.userId = decodedPayload.userId;
        next();
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return res.status(401).send({ error: "Unauthorized" });
    }
};


