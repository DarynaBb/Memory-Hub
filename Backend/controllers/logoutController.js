import jwt from "jsonwebtoken";

export const postLogoutController = async (req, res) => {
  res.clearCookie("jwt", {
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.clearCookie("JWTinfo", {
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.send({ msg: "erfolgreich ausgeloggt" });
};
