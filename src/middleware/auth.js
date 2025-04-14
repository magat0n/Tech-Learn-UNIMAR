const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Obtém o token do header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adiciona o usuário ao request
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
}; 