import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '60s' });
};

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No Token, please login.' });
    }
  
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid Token.' });
      }
      req.user = user;
      next();
    });
};

export { generateToken, verifyToken };