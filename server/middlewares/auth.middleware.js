import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;

  //  return res.json(token)

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const Secret_Key = process.env.SECRET;

  try {
    const decoded = jwt.verify(token, Secret_Key);
    req.user = decoded;  // Attach decoded payload to request object
    return res.json({
      user: decoded,
      message: "your have valid token for auto log"
    })
    next();              // Call next middleware/route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
