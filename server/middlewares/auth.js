
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  // if not login
  if (!accessToken) 
    return res.json({ error: "Login First" });

  try {
    const validToken = verify(accessToken, "secret");
    req.user = validToken; // to use username of user in post 
    if (validToken) {
      return next(); // token is correct
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };