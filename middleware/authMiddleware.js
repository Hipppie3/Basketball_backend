import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
const token = req.cookies.token;
if (!token) {
 res.status(401).json({message: "Unauthorized"})
};

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
 if (err) {
  return res.status(403).json({message: "Invalid credentails"})
 } 
 req.user = decoded
 next();
});
};

export const isAdmin = (req, res, next) => {
 if (req.user && req.user.role === 'admin') {
  next();
 } else {
  res.status(403).json({message: "Access denied: Admins only"});
 }
};

